import { Box, HStack, Text, Button } from '@chakra-ui/core'
import VoteButtons from './vote-buttons'
import ReactionEmojis from './emoji-buttons'
import React from 'react'
import $ from 'jquery'

const Post = ({ post }) => {
    var expanded = false;
    const imgClicked = () => {
        
        if(!expanded) {
            
                $(`#${post.id}-file`).css({'max-height': '700px', 'height': '700px'})
            
            expanded = true;
        } else {
            
                $(`#${post.id}-file`).css({'max-height': '300px', 'height': '300px'})
            
            expanded  = false;
        }
    }

    var img;
    if(post.fileSrc != ''){
        img= <img id={`${post.id}-file`} className='post-img' src={post.fileSrc} alt='img' onClick={imgClicked}/> 
    } else {
        img = null;
    }

    return (
        <HStack key={post.id} w='100%' alignItems='flex-start'>
            <VoteButtons post={post} />
            <Box className='post' bg='gray.100' p={4} rounded='md' w='100%'>
                <Text>{post.title}</Text>
                {img}
                <ReactionEmojis post={post} />
            </Box>
        </HStack>
    )
}

export default Post;