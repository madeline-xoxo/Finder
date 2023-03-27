import React from "react"

export default function Border(props: any) {
    return (
        <div className="container">
        <div id="titlebar">
          <div id="titlebar-content">
            <div id="buttons">
              <div id="close" onClick={() => window.close()}>
                x
              </div>
            </div>
            <div id="window-title">
              <div>Finder</div>
            </div>
          </div>
        </div>
        <div id="window">
          <div id="content">
            {props.children}
          </div>
        </div>
      </div>
    )
}