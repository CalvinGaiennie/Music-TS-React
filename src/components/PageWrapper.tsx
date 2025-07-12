function PageWrapper({
  title,
  mainComponent,
}: {
  title: string;
  mainComponent: React.ReactNode;
}) {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">{title}</h1>
      {mainComponent}
    </div>
  );
}

export default PageWrapper;
