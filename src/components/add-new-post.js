import {
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
  } from "@chakra-ui/core";
  import React, { useState, useEffect } from "react";
  import { db, storage } from "../lib/firebase";
  import $ from 'jquery'

  const AddNewPost = () => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [title, setTitle] = useState('')
      const [isSaving, setSaving] = useState(false)
      const [fileUrl, setFileUrl] = useState('')

      const handleSubmit = async () => {
          const date = new Date();

          await db.collection('posts').add({
              title,
              upVotesCount: 0,
              downVotesCount: 0,
              thumbsupReactions: 0,
              hoorayReactions: 0,
              heartReactions: 0,
              fireReactions: 0,
              eyesReactions: 0,
              fileSrc: fileUrl,
              createdAt: date.toUTCString(),
              updateAt: date.toUTCString()
          })

          onClose();
          setTitle('')
      }

      const handleFileChange = async (event) => {
        // if (event.target.files && event.target.files[0]) {
        //   setFile(URL.createObjectURL(event.target.files[0]));
        // }

        const file = event.target.files[0];
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()

        setFileUrl(fileUrl)
      }

      return (
          <>
            <Button onClick={onOpen} colorScheme='purple'>
                Add new post
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Add new post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id='post-title'>
                                <FormLabel>Post Title</FormLabel>
                                <Textarea 
                                    type='post-title' 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input id='file' 
                                       className='inputFile'
                                       type='file' 
                                       name='file' 
                                       onChange={handleFileChange}
                                />
                                
                                <label for='file'>
                                    <i className='fa fa-upload' style={{marginRight: '5px'}}></i>
                                    <span>Choose a file</span>
                                </label>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack spacing={4}>
                                <Button onClick={onClose}>Close</Button>
                                <Button 
                                    onClick={handleSubmit}
                                    colorScheme='blue'
                                    disabled={!title.trim()}
                                    isLoading={isSaving}
                                >
                                    Save
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
          </>
      )
  }

  export default AddNewPost;