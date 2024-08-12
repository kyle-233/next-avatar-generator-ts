interface TestLayoutProps
  extends React.PropsWithChildren<{
    notifications: React.ReactNode
  }> {}

const Layout = ({ ...props }: TestLayoutProps) => {
  console.log(props)
  return (
    <html lang={'en'}>
      <body>
        {props.children}
        {props.notifications}
      </body>
    </html>
  )
}

export default Layout
