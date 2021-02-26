import { Box, Container, Flex } from '@chakra-ui/core'
import React, { useState, useEffect } from 'react'
import AddNewPost from './add-new-post'
import { storage } from '../lib/firebase'


const Navbar = () => {
    const [logoUrl, setLogoUrl] = useState('')

    useEffect(async () => {
        const logoRef = storage.refFromURL('gs://reddit-clone-38f76.appspot.com/reddit.png')
        const logoUrl = await logoRef.getDownloadURL();
        setLogoUrl(logoUrl)
    })
    

    return (
        <Box position='sticky' top={0} p={4} bg='gray.100' zIndex={1}>
            <Container maxW='md' centerContent>
                <Flex justifyContent='space-between' alignItems='center' w='96%' position='sticky' top={0}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={logoUrl} alt='reddit-logo' style={{width: '50px', marginRight: '5px'}}/>
                        <h1 style={{color: '#845bd4', fontSize: '2.0rem',fontWeight: '700'}}>Reddit</h1>
                    </div>
                    <AddNewPost />
                </Flex>
            </Container>
        </Box>
    )
}

export default Navbar