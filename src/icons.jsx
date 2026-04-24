// Proste ikony linii — zgodne ze stylem referencji (cienka linia 1.5, kwadratowy cap)
const I = (props) => {
  const { size = 24, stroke = 'currentColor', children, sw = 1.5, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" {...rest}>
      {children}
    </svg>
  );
};

const Icon = {
  Terrace: (p) => <I {...p}><path d="M3 18h18M5 18V9h14v9M5 9l7-4 7 4M8 18v-5h8v5"/></I>,
  Entrance: (p) => <I {...p}><path d="M3 20h18M6 20V7h12v13M9 20v-5h6v5M4 7h16"/></I>,
  Carport: (p) => <I {...p}><path d="M3 10h18M5 10V6h14v4M7 10v8M17 10v8M4 18h16"/><circle cx="8" cy="18" r="1.2"/><circle cx="16" cy="18" r="1.2"/></I>,
  Garden: (p) => <I {...p}><path d="M3 20h18M5 20V10h14v10M5 10l7-5 7 5M9 20v-5h6v5"/></I>,
  Commercial: (p) => <I {...p}><path d="M4 20V8h16v12M4 8l8-4 8 4M8 20v-6h8v6M10 8h4"/></I>,
  Pool: (p) => <I {...p}><path d="M3 20h18M3 16c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1M7 14V6h2v8M15 14V6h2v8"/></I>,
  Lamel: (p) => <I {...p}><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></I>,
  Glass: (p) => <I {...p}><rect x="4" y="4" width="16" height="16"/><path d="M4 4l16 16M20 4L4 20"/></I>,
  Hybrid: (p) => <I {...p}><path d="M4 7h16v10H4z M4 12h16"/><path d="M7 7v5M11 7v5M15 7v5M19 7v5"/></I>,
  Rain: (p) => <I {...p}><path d="M6 14s1-4 6-4 6 4 6 4M9 18l-1 2M12 18l-1 2M15 18l-1 2"/></I>,
  Led: (p) => <I {...p}><path d="M12 3v2M5.6 5.6l1.4 1.4M3 12h2M5.6 18.4l1.4-1.4M18.4 5.6l-1.4 1.4M21 12h-2M18.4 18.4l-1.4-1.4"/><circle cx="12" cy="12" r="4"/></I>,
  Auto: (p) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></I>,
  Profile: (p) => <I {...p}><rect x="3" y="3" width="18" height="18"/><rect x="6" y="6" width="12" height="12"/></I>,
  Shield: (p) => <I {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></I>,
  Tools: (p) => <I {...p}><path d="M14 7l3-3 3 3-3 3-3-3zM3 21l6-6M10 14l-7 7M4 4l5 5"/></I>,
  Frame: (p) => <I {...p}><rect x="3" y="5" width="18" height="14"/><path d="M3 9h18"/></I>,
  Snow: (p) => <I {...p}><path d="M12 3v18M4 7l16 10M4 17l16-10M9 4l3 2 3-2M9 20l3-2 3 2M3 10l3 2-3 2M21 10l-3 2 3 2"/></I>,
  Wall: (p) => <I {...p}><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></I>,
  Roof: (p) => <I {...p}><path d="M3 14l9-7 9 7M6 14v6h12v-6"/></I>,
  Floor: (p) => <I {...p}><path d="M3 18h18M5 18l3-8h8l3 8"/></I>,
  Fabric: (p) => <I {...p}><path d="M3 6c3 2 6 2 9 0s6-2 9 0M3 12c3 2 6 2 9 0s6-2 9 0M3 18c3 2 6 2 9 0s6-2 9 0"/></I>,
  Motor: (p) => <I {...p}><rect x="4" y="8" width="12" height="8"/><path d="M16 10l4-2v8l-4-2M2 11h2M2 13h2"/></I>,
  Bracket: (p) => <I {...p}><path d="M4 4v16h16M8 8h12M8 12h12M8 16h12"/></I>,
  Pillar: (p) => <I {...p}><path d="M8 3h8v18H8zM6 21h12M6 3h12"/></I>,
  Guide: (p) => <I {...p}><path d="M4 4h16v16H4zM4 10h16M4 16h16"/></I>,
  Bolt: (p) => <I {...p}><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></I>,
  Hook: (p) => <I {...p}><path d="M12 3v12a4 4 0 1 1-4-4"/></I>,
  BoxL: (p) => <I {...p}><rect x="3" y="3" width="18" height="18"/><path d="M3 15h18"/></I>,
  BoxR: (p) => <I {...p}><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18"/></I>,
  Check: (p) => <I {...p}><path d="M5 12l5 5 9-11"/></I>,
  Close: (p) => <I {...p}><path d="M5 5l14 14M19 5L5 19"/></I>,
  Arrow: (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6"/></I>,
  Leaf: (p) => <I {...p}><path d="M5 20c0-9 5-14 14-14 0 9-5 14-14 14zM5 20l10-10"/></I>,
};

window.Icon = Icon;
