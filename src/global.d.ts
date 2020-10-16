declare module '*.png' {
    const value: any;
    export default value;
}
declare module '*.svg' {
    const value: any;
    export default value;
}
declare module '*.md' {
    const content: string;
    export = content;
}
declare module '*.module.scss' {
    const content: { [className: string]: string };
    export default content;
}
