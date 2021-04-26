import React, {useState, useEffect, useMemo} from "react"
import {Card} from "antd"
import "./SuggestionList.scss"
import Suggestion from "./Suggestion";
import {useAppContext} from "store";
import useAxios from "axios-hooks";

const SuggestionList = ({style}) => {
    const {store: {jwtToken}} = useAppContext();
    const [userList, setUserList] = useState([]);
    const headers = {Authorization: `JWT ${jwtToken}`}
    const [{data: origuserList, loading, error}, refetch] = useAxios({
        url: "http://localhost:8000/accounts/suggestions/",
        headers
    });

    useEffect(() => {
        console.log(origuserList)
        if (!origuserList)
            setUserList([]);
        else
            setUserList(origuserList.map(user => ({...user, is_follow: false})));
    }, [origuserList]);

    const onFollowUser = (username) => {
        setUserList(prevUserList => {
            return prevUserList.map(user => {
                return (user.username !== username) ? user : {...user, is_follow: true}
                // if (user.username === username) {
                //     return {...user, is_follow: true};
                // } else {
                //     return user;
                // }
            })
        })
    }

    return (
        <div style={style}>
            {loading && <div>Loading...</div>}
            {error && <div>로딩 중에 에러가 발생 했습니다.</div>}

            <button onClick={() => refetch()}>Reload</button>

            <Card title="Suggestions for you" size="small">
                {userList && userList.map(suggestionUser =>
                    <Suggestion key={suggestionUser.username} suggestionUser={suggestionUser}
                                onFollowUser={onFollowUser}/>
                )}
            </Card>
        </div>
    )
}

export default SuggestionList