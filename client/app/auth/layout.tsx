const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
      <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-400 to-yellow-800">
        {children}
      </div>
    );
}

export default AuthLayout