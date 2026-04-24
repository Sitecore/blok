/**
 * GitHub GraphQL helpers for Discussions — more reliable than REST for some repos/tokens.
 * @see https://docs.github.com/en/graphql/reference/mutations#adddiscussioncomment
 * @see https://docs.github.com/en/graphql/reference/mutations#addlabelstolabelable
 */

const MUTATION_ADD_COMMENT = `
mutation AddDiscussionComment($discussionId: ID!, $body: String!) {
  addDiscussionComment(input: { discussionId: $discussionId, body: $body }) {
    comment {
      id
      url
    }
  }
}
`;

const QUERY_COMMENT_BODIES = `
query DiscussionCommentBodies($id: ID!) {
  node(id: $id) {
    ... on Discussion {
      comments(first: 100) {
        nodes {
          body
        }
      }
    }
  }
}
`;

const QUERY_REPO_LABEL = `
query RepoLabelByName($owner: String!, $name: String!, $label: String!) {
  repository(owner: $owner, name: $name) {
    label(name: $label) {
      id
      name
    }
  }
}
`;

const MUTATION_ADD_LABELS_TO_LABELABLE = `
mutation AddLabelsToLabelable($labelableId: ID!, $labelIds: [ID!]!) {
  addLabelsToLabelable(input: { labelableId: $labelableId, labelIds: $labelIds }) {
    labelable {
      ... on Discussion {
        id
      }
    }
  }
}
`;

async function graphqlRequest<T>(params: {
  token: string;
  query: string;
  variables: Record<string, unknown>;
}): Promise<T> {
  const url =
    process.env.GITHUB_GRAPHQL_URL?.trim() || "https://api.github.com/graphql";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.query,
      variables: params.variables,
    }),
  });
  const json = (await res.json()) as {
    errors?: { message: string }[];
    data?: T;
  };
  if (!res.ok) {
    throw new Error(
      `GraphQL HTTP ${res.status}: ${JSON.stringify(json).slice(0, 600)}`,
    );
  }
  if (json.errors?.length) {
    throw new Error(`GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (json.data === undefined) {
    throw new Error("GraphQL: empty response");
  }
  return json.data;
}

export async function addDiscussionCommentGraphql(params: {
  token: string;
  discussionNodeId: string;
  body: string;
}): Promise<void> {
  type Data = {
    addDiscussionComment?: {
      comment?: { id: string; url?: string } | null;
    } | null;
  };
  await graphqlRequest<Data>({
    token: params.token,
    query: MUTATION_ADD_COMMENT,
    variables: {
      discussionId: params.discussionNodeId,
      body: params.body,
    },
  });
}

/** Concatenated comment bodies for idempotency checks (e.g. automation marker, legacy "Tracked in #"). */
export async function getDiscussionCommentBodiesGraphql(params: {
  token: string;
  discussionNodeId: string;
}): Promise<string[]> {
  type Data = {
    node?: {
      comments?: { nodes?: { body?: string }[] | null } | null;
    } | null;
  };
  const data = await graphqlRequest<Data>({
    token: params.token,
    query: QUERY_COMMENT_BODIES,
    variables: { id: params.discussionNodeId },
  });
  if (data.node == null) {
    throw new Error(
      "GraphQL: discussion node not found (check discussion node_id and token access).",
    );
  }
  const nodes = data.node.comments?.nodes;
  if (!Array.isArray(nodes)) return [];
  return nodes.map((n) => n.body || "").filter(Boolean);
}

async function getRepositoryLabelId(
  token: string,
  owner: string,
  repo: string,
  labelName: string,
): Promise<string> {
  type LabelData = {
    repository?: { label?: { id: string; name?: string } | null } | null;
  };
  const data = await graphqlRequest<LabelData>({
    token,
    query: QUERY_REPO_LABEL,
    variables: { owner, name: repo, label: labelName },
  });
  const id = data.repository?.label?.id;
  if (!id) {
    throw new Error(
      `GraphQL: repository label "${labelName}" not found. Create it under Issues → Labels (discussions use the same label set).`,
    );
  }
  return id;
}

/**
 * Adds existing repository labels to a discussion by name (GraphQL).
 * Discussions implement `Labelable`; REST `PUT .../discussions/{n}/labels` often returns 404 on github.com.
 */
export async function addDiscussionLabelsByName(params: {
  token: string;
  owner: string;
  repo: string;
  discussionNodeId: string;
  labelNames: string[];
}): Promise<void> {
  const unique = [
    ...new Set(params.labelNames.map((n) => n.trim()).filter(Boolean)),
  ];
  if (!unique.length) return;

  const labelIds = await Promise.all(
    unique.map((name) =>
      getRepositoryLabelId(params.token, params.owner, params.repo, name),
    ),
  );

  type AddLabelsData = {
    addLabelsToLabelable?: {
      labelable?: { id: string } | null;
    } | null;
  };
  await graphqlRequest<AddLabelsData>({
    token: params.token,
    query: MUTATION_ADD_LABELS_TO_LABELABLE,
    variables: {
      labelableId: params.discussionNodeId,
      labelIds,
    },
  });
}
