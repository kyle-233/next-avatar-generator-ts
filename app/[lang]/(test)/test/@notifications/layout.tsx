interface TestLayoutProps extends React.PropsWithChildren<{}> {}

const Layout = ({ ...props }: TestLayoutProps) => {
  console.log(props)
  return (
    <div>
      {props.children}
      {/* {notifications} */}
    </div>
  )
}

export default Layout
