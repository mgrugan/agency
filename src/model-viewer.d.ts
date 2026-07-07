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
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "field-of-view"?: string;
        "shadow-intensity"?: string;
        "shadow-softness"?: string;
        "tone-mapping"?: string;
        "environment-image"?: string;
        "auto-rotate"?: boolean;
        poster?: string;
        exposure?: string;
        loading?: string;
        reveal?: string;
      },
      HTMLElement
    >;
  }
}
