export const BackgroundGradient = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute w-[100vh] h-screen bg-gradient-top rounded-full opacity-20 blur-[4rem] -top-1/2 -right-[20%]" />
      <div className="absolute w-[100vh] h-screen bg-gradient-bottom rounded-full opacity-20 blur-[4rem] -bottom-1/2 -left-[20%]" />
    </div>
  )
}
