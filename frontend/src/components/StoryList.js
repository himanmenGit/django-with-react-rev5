import React from "react"
import {Card} from "antd"
import "./StoryList.scss"

const StoryList = ({style}) => {
    return (
        <div style={style}>
            <Card title="Stories" size="small">
                스토리
            </Card>
        </div>
    )
}

export default StoryList