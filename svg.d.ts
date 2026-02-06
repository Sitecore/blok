declare module "*.svg" {
  const content: string | { src: string; default: string };
  export default content;
}
