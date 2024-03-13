import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, setPosts } from "state";
import PostWidget from "./PostWidget";

const Posts = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const host = process.env.REACT_APP_HOSTURL

    const getAllPosts = async () => {
        await fetch(`${host}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(async(res)=>{
            const data = await res.json();
            console.log(
                new Intl.DateTimeFormat('en-GB',{dateStyle:'full',timeStyle:"short",hour12:true}).format( new Date(data[0].createdAt))
            )
            if(!res.ok)
                throw new Error(Object.values(data)[0])
            dispatch(setPosts({ posts: data }));
        }).catch((err)=>{
            console.error(err)
            dispatch(clearPosts())
        });
    };

    const getUserPosts = async () => {
        await fetch(
            `${host}/posts/${userId}/posts`,{
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }).then(async(res)=>{
                if(!res.ok) throw new Error(res)
                const data = await res.json();
                dispatch(setPosts({ posts: data }));
            }).catch(err=>{
                dispatch(setPosts({posts:[]}))
                console.error(err)
            })
    };

    useEffect(() => {
        if (isProfile)
            getUserPosts();
         else 
            getAllPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            
            {posts.map(
                ({
                    _id,
                    p_userId,
                    firstName,
                    lastName,
                    description,
                    createdAt,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={p_userId}
                        userId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        datetime={new Intl.DateTimeFormat('en-US',{dateStyle:'full',timeStyle:"short",hour12:true}).format(new Date(createdAt))}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default Posts;