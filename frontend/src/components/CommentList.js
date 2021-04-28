import React, {useState} from 'react'
import {Avatar, Input, Button, Tooltip} from "antd";
import useAxios from "axios-hooks";
import Axios from 'axios'
import {useAppContext} from "../store";
import Comment from "./Comment";

const CommentList = ({post}) => {
    const {store: {jwtToken}} = useAppContext();
    const headers = {Authorization: `JWT ${jwtToken}`}

    const [commentContent, setCommentContent] = useState("");

    const [{data: commentList, loading, error}, refetch] = useAxios({
        url: `http://localhost:8000/api/posts/${post.id}/comments/`,
        headers
    });

    const handleCommentSave = async () => {
        const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/`;
        try {
            const response = await Axios.post(
                apiUrl,
                {message: commentContent},
                {headers}
            )
            console.log("response : ", response)
            setCommentContent("")
            refetch()
        } catch (error) {
            console.log("error : ", error)
        }
    }

    return (
        <div>
            {
                commentList &&
                commentList.map(comment =>
                    <Comment key={comment.id} comment={comment}/>
                )
            }

            <Input.TextArea
                style={{marginBottom: "0.5em"}}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button
                block
                type="primary"
                disabled={commentContent.length === 0}
                onClick={handleCommentSave}
            >
                댓글쓰기
            </Button>
        </div>
    )
}

export default CommentList