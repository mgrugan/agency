declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean;
        "disable-zoom"?: boolean;
        "disable-pan"?: boolean;
        "disable-tap"?: boolean;
        "interaction-prompt"?: string;
        "camera-orbit"?: string;
        "shadow-intensity"?: string;
        "environment-image"?: string;
        exposure?: string;
        loading?: string;
        reveal?: string;
      },
      HTMLElement
    >;
  }
}
