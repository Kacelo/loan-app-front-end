interface text {
  text: string;
  styles?: {}
}

export function Heading1(props: text) {
  const { text } = props;
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  );
}
export function Heading2(props: text) {
  const { text } = props;

  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  );
}
export function Heading3(props: text) {
  const { text } = props;

  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text}
    </h3>
  )
}

export function TypographyLarge() {
  return <div className="text-lg font-semibold">Are you absolutely sure?</div>;
}
export function TypographyList() {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );
}
export function MutedText(props: text) {
  const { text, styles } = props;

  return <p className="text-sm text-muted-foreground" style={styles} > {text}</p>;
}
