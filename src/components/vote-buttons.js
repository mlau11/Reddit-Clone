import { IconButton, Text, VStack } from '@chakra-ui/core'
import React, {useState} from 'react'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'
import { db } from '../lib/firebase'

const VoteButtons = ({ post }) => {
    const handleClick = async (type) => {
        let upVotesCount = post.upVotesCount;
        let downVotesCount = post.downVotesCount

        const date = new Date()

        if(type === 'upvote') {
            upVotesCount += 1;
        } else {
            downVotesCount += 1
        }

        await db.collection('posts').doc(post.id).set({
            title: post.title,
            upVotesCount,
            downVotesCount,
            thumbsupReactions: post.thumbsupReactions,
            hoorayReactions: post.hoorayReactions,
            heartReactions: post.heartReactions,
            fireReactions: post.fireReactions,
            eyesReactions: post.eyesReactions,
            fileSrc: post.fileSrc,
            createdAt: post.createdAt,
            updatedAt: date.toUTCString()
        })
    }

    return (
        <>
            <VStack>
                <IconButton 
                    size='lg'
                    colorScheme='purple'
                    aria-label='upvote'
                    icon={<FiArrowUp />}
                    onClick={() => handleClick('upvote')}    
                />
                <Text bg='gray.100' rounded='md' w='100%' p={1} display='flex' justifyContent='center'>
                    {post.upVotesCount}
                </Text>
            </VStack>
            <VStack>
                <IconButton 
                    size='lg'
                    colorScheme='yellow'
                    aria-label='upvote'
                    icon={<FiArrowDown />}
                    onClick={() => handleClick('downvote')}    
                />
                <Text bg='gray.100' rounded='md' w='100%' p={1} display='flex' justifyContent='center'>
                    {post.downVotesCount}
                </Text>
            </VStack>
        </>
    )
}

export default VoteButtons;