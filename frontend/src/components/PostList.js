import React, {useEffect, useState} from 'react'
import {Alert} from 'antd'
import Axios from 'axios'
import useAxios from "axios-hooks";
import Post from './Post'
import {useAppContext} from "store";

function PostList() {
    const {store: {jwtToken}} = useAppContext();
    const [postList, setPostList] = useState([]);

    const headers = {Authorization: `JWT ${jwtToken}`}
    const [{data: originPostList, loading, error}, refetch] = useAxios({
        url: "http://localhost:8000/api/posts/",
        headers
    });

    useEffect(() => {
        setPostList(originPostList);
    }, [originPostList])

    const handleLike = async ({post, isLike}) => {
        const apiUrl = `http://localhost:8000/api/posts/${post.id}/like/`
        const method = isLike ? "POST" : "DELETE"

        try {
            const response = await Axios({
                url: apiUrl,
                method,
                headers
            })
            console.log("response : ", response)
            setPostList(prevList => {
                return prevList.map(currentPost =>
                    currentPost === post ? {...currentPost, is_like: isLike} : currentPost
                )
            })
        } catch (error) {
            console.log("error : ", error)
        }
    }

    return (
        <div>
            {
                postList &&
                postList.length === 0 &&
                <Alert type='warning' message="포스팅이 없습니다."/>
            }
            {postList && postList.map((post) => {
                return <Post post={post} key={post.id} handleLike={handleLike}/>
            })}
        </div>
    )
}

export default PostList;