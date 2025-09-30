import { useCallback } from "react"
import { atom, useAtom } from "jotai"
import type { PrimitiveAtom } from "jotai"
import { atomWithReset } from "jotai/utils"

export const TOOL_ACTIONS = {
  TOGGLE_BRAINSTORMING: "TOGGLE_BRAINSTORMING",
  TOGGLE_BRIEF: "TOGGLE_BRIEF",
  RESET_ALL_TOOLS: "RESET_ALL_TOOLS",
  CONFIGURE_BRAINSTORMING: "CONFIGURE_BRAINSTORMING",
} as const

export type ToolActionType = (typeof TOOL_ACTIONS)[keyof typeof TOOL_ACTIONS]
export type SearchType = "web" | "knowledge" | "knowledge_web"

export interface ToolState {
  brainstorming: {
    active: boolean
    data: {
      mode: "brainstorming"
      params: {
        searchType: SearchType
      }
    }
  }
  contentOpsBrief: {
    active: boolean
    data?: any
  }
}

const initialToolState: ToolState = {
  brainstorming: {
    active: false,
    data: {
      mode: "brainstorming",
      params: {
        searchType: "knowledge_web",
      },
    },
  },
  contentOpsBrief: {
    active: false,
  },
}

export const toolStateAtom = atomWithReset<ToolState>(initialToolState)
toolStateAtom.debugLabel = "toolStateAtom"

export interface ToolAction {
  type: ToolActionType
  payload?: any
}

// Reducer
export const toolReducer = (
  state: ToolState,
  action: ToolAction
): ToolState => {
  switch (action.type) {
    case TOOL_ACTIONS.TOGGLE_BRAINSTORMING: {
      const isCurrentlyActive = state.brainstorming.active
      return {
        ...state,
        contentOpsBrief: { ...state.contentOpsBrief, active: false },
        brainstorming: {
          ...state.brainstorming,
          active: !isCurrentlyActive,
        },
      }
    }

    case TOOL_ACTIONS.CONFIGURE_BRAINSTORMING: {
      return {
        ...state,
        brainstorming: {
          ...state.brainstorming,
          data: {
            ...state.brainstorming.data,
            params: {
              searchType: action.payload.searchType,
            },
          },
        },
      }
    }

    case TOOL_ACTIONS.TOGGLE_BRIEF: {
      const isCurrentlyActive = state.contentOpsBrief.active
      return {
        ...state,
        brainstorming: { ...state.brainstorming, active: false },
        contentOpsBrief: {
          ...state.contentOpsBrief,
          active: !isCurrentlyActive,
        },
      }
    }

    case TOOL_ACTIONS.RESET_ALL_TOOLS: {
      return initialToolState
    }

    default:
      console.error(`Unknown tool action: ${action.type}`)
      return state
  }
}

export function useReducerAtom<Value, Action>(
  anAtom: PrimitiveAtom<Value>,
  reducer: (v: Value, a: Action) => Value
) {
  const [state, setState] = useAtom(anAtom)
  const dispatch = useCallback(
    (action: Action) => setState((prev) => reducer(prev, action)),
    [setState, reducer]
  )

  return [state, dispatch] as const
}

// Dispatcher
export function useToolDispatch() {
  const [state, setState] = useAtom(toolStateAtom)
  const dispatch = useCallback(
    (action: ToolAction) =>
      setState((prev) => {
        if (typeof prev === "symbol") return initialToolState
        return toolReducer(prev, action)
      }),
    [setState]
  )
  return [state, dispatch] as const
}

// Selectors
export const brainstormingStateAtom = atom(
  (get) => get(toolStateAtom).brainstorming
)
export const briefStateAtom = atom((get) => get(toolStateAtom).contentOpsBrief)
export const isAnyToolActiveAtom = atom((get) => {
  const state = get(toolStateAtom)
  return Object.values(state).some((tool) => tool.active)
})
export const activeToolNameAtom = atom((get) => {
  const state = get(toolStateAtom)
  return (
    (Object.keys(state) as (keyof ToolState)[]).find(
      (toolName) => state[toolName].active
    ) || null
  )
})

export const activeToolDataAtom = atom((get) => {
  const state = get(toolStateAtom)
  const activeTool = Object.values(state).find((tool) => tool.active)

  return activeTool?.data
})
