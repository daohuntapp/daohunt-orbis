import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { toolsData } from "../data/toolsData";
import { Orbis } from "@orbisclub/orbis-sdk";
import { ChatBox } from '@orbisclub/modules'
// import PostPreview from "./PostPreview";

// import { useOrbis } from "../utils/context/orbis";

import "@orbisclub/modules/dist/index.modern.css";

let orbis = new Orbis();

const PostNew = () => {
 
  const [user, setUser] = useState();
 const [loadingText, setLoadingText] = useState('Publishing');
  const [ publishing, setPublishing ] = useState( false );
   const [title, setTitle] = useState('');
    const [text, setText] = useState('');
  
   const [posts, setPosts] = useState([]);

    // const { orbis } = useOrbis();

    const getPosts = async () => {
        console.log('Getting home posts');
        const { data, error } = await orbis.getPosts({
            algorithm: 'all-context-master-posts',
            context: ""
        })

        console.log('Posts', data);

        setPosts(data)
    }

  useEffect( () =>
  {
    if ( orbis )
    {
       getPosts()
      
    }
      
       
    }, [orbis,user])

	/** Calls the Orbis SDK and handle the results */
	async function connect() {
    let res = await orbis.connect();

		/** Check if connection is successful or not */
		if(res.status == 200) {
			setUser(res.did);
		} else {
			console.log("Error connecting to Ceramic: ", res);
			alert("Error connecting to Ceramic.");
		}
  }
  
 


const handlePublish = async () => {
        if (text == '' || title == '') {
            //TODO handle error msg
            return;
        }

       
        console.log('Publishing', title);

            const postData = {
                title: title,
                body: text,
                context: "",
                data: {}
            }

      
        


        let res = await orbis.createPost(postData)
        

  console.log( 'Orbis response', res );
  setPublishing(false);
       
       

        
    }

  return (
    <div className="main">

      <section className="itemsSection">
        <div className="containerNew">
          <div className="row itemOuter center">
            <div>
                        {user ?
                          <p>Connected with: {user}</p>
                        :
                          <button onClick={() => connect()}>Connect</button>
              }
                                                <br></br><br></br><br></br>


                  <form>
                      


                      <h4>
                  Create New Post
<br></br><br></br>
                   </h4> 
                <input type={ Text } id="title"></input>
                <br></br><br></br><br></br>
                    
                              <button onClick={handlePublish}  >Submit</button>
                            
              </form>
              <ChatBox context="kjzl6cwe1jw147b42j1yjoxyzrzeg3czq5mjm1lrmg5eeq43yutje3f2s0s2n5h" poweredByOrbis="black" />
            </div>
            
     
         
          </div>
        </div>
      </section>

       <Flex w='100%' h='100%' alignItems='center' flexDirection='column' ml='250px'>
            <Flex
                w='55%'
                alignItems='center'
                flexDirection='column'
                border='1px solid'
                borderColor='brand.500'
                position='relative'
            >
                <Flex borderBottom='1px solid' borderColor='brand.500' w='100%'>
                    <Text fontWeight='bold' pl='30px' py='10px' color='brand.500' fontSize='2xl'>HOME</Text>
                </Flex>
                {/* <CreatePost withPicture getPosts={getPosts}/> */}
                {/* {posts.length > 0 && posts.map((post, i) => <PostPreview key={i} post={post}/>)} */}
            </Flex>

        </Flex>
    </div>
  );
};

export default PostNew;
