import React,{useState, useEffect} from "react";
import databaseService from '../appwrite/databaseandstorage'
import { Container, PostCard } from "../components/index";


function Home(){
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        databaseService.getPosts().then((post)=>{
            if(post) setPosts(post.documents)
        })
    },[])

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-white hover:text-gray-500">
                                No Posts to read right now...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home