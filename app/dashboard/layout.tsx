import NavBar from "./navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
       <div className="flex flex-col h-screen md:overflow-hidden">
      <div>
        <NavBar/>
      </div>
      <div>{children}</div>
    </div>
    </main>
     
  );
}
