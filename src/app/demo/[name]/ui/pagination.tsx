export const pagination = {
  name: "pagination",
  preview: {
    defaultComponent: "pagination",
  },
  usage: {
    usage: [
      `import {\n  Pagination,\n  PaginationContent,\n  PaginationEllipsis,\n  PaginationItem,\n  PaginationLink,\n  PaginationNext,\n  PaginationPrevious,\n} from "@/components/ui/pagination";`,
      `<Pagination>\n <PaginationContent>\n  <PaginationItem>\n   <PaginationPrevious href="#" />\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationLink href="#">1</PaginationLink>\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationLink href="#" isActive>2</PaginationLink>\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationLink href="#">3</PaginationLink>\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationEllipsis />\n  </PaginationItem>\n  <PaginationItem>\n   <PaginationNext href="#" />\n  </PaginationItem>\n </PaginationContent>\n</Pagination>`,
    ],
  },
};
