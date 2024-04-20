import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"
import Header from "./header"
import myLogo from "./favicon.ico"

const MySmallIcon = () => (
  <img src={myLogo} alt="My Logo" style={{ width: 24, height: 24 }} />
);

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
        Header={Header}
        Title = {(titleProps) => <ThemedTitleV2 {...titleProps} text = "THE TRADERS INSIGHT" icon = {<MySmallIcon />} />}
    >
        {children}
    </ThemedLayoutV2>
  )
}

export default Layout