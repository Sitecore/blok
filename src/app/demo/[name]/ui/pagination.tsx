import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const pagination = {
  name: "pagination",
  defaultComponent: (
    <div className="flex flex-col gap-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
  usage: [
    `import {\n  Pagination,\n  PaginationContent,\n  PaginationEllipsis,\n  PaginationItem,\n  PaginationLink,\n  PaginationNext,\n  PaginationPrevious,\n} from "@/components/ui/pagination";`,
    `<Pagination>\n <PaginationContent>\n  <PaginationItem>\n   <PaginationPrevious href="#" />\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationLink href="#">1</PaginationLink>\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationLink href="#" isActive>2</PaginationLink>\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationLink href="#">3</PaginationLink>\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationEllipsis />\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationNext href="#" />\n  </PaginationItem>\n </PaginationContent>\n</Pagination>`,
  ],
};
