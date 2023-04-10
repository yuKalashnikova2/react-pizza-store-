import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={288}
    height={465}
    viewBox="0 0 288 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="156" r="118" /> 
    <rect x="1" y="286" rx="10" ry="10" width="288" height="26" /> 
    <rect x="2" y="331" rx="10" ry="10" width="282" height="83" /> 
    <rect x="6" y="429" rx="10" ry="10" width="88" height="25" /> 
    <rect x="128" y="420" rx="10" ry="10" width="148" height="43" />
  </ContentLoader>
)

export default  Skeleton