import { Button, HStack } from "@chakra-ui/core";
import React from "react";
import $ from "jquery";

import { db } from "../lib/firebase";

const ReactionEmojis = ({ post }) => {
  const emoji = ["👍", "🎉", "❤️", "🔥", "👀"];

  const handleClick = async (type) => {
    let thumbsupReactions = post.thumbsupReactions;
    let hoorayReactions = post.hoorayReactions;
    let heartReactions = post.heartReactions;
    let fireReactions = post.fireReactions;
    let eyesReactions = post.eyesReactions;

    const date = new Date();

    if (type === "thumbsup") {
      thumbsupReactions += 1;
    } else if (type === "hooray") {
      hoorayReactions += 1;
    } else if (type === "heart") {
      heartReactions += 1;
    } else if (type === "fire") {
      fireReactions += 1;
    } else {
      eyesReactions += 1;
    }

    await db.collection("posts").doc(post.id).set({
      title: post.title,
      upVotesCount: post.upVotesCount,
      downVotesCount: post.downVotesCount,
      thumbsupReactions,
      hoorayReactions,
      heartReactions,
      fireReactions,
      eyesReactions,
      fileSrc: post.fileSrc,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });
  };

  const shake = (e) => {
    $(`#${e.target.id}`).addClass("shake");

    setTimeout(function () {
      $(`#${e.target.id}`).removeClass("shake");
    }, 1000);
  };

  return (
    <>
      <HStack mt={2}>
        <Button
          size="xs"
          id={`${post.id}-thumbsup`}
          colorScheme="purple"
          aria-label="thumbsup"
          onClick={(e) => {
            handleClick("thumbsup");
            shake(e);
          }}
        >
          {emoji[0]} {post.thumbsupReactions}
        </Button>

        <Button
          size="xs"
          id={`${post.id}-hooray`}
          colorScheme="purple"
          aria-label="hooray"
          onClick={(e) => {
            handleClick("hooray");
            shake(e);
          }}
        >
          {emoji[1]} {post.hoorayReactions}
        </Button>

        <Button
          size="xs"
          id={`${post.id}-heart`}
          colorScheme="purple"
          aria-label="heart"
          onClick={(e) => {
            handleClick("heart");
            shake(e);
          }}
        >
          {emoji[2]} {post.heartReactions}
        </Button>

        <Button
          size="xs"
          id={`${post.id}-fire`}
          colorScheme="purple"
          aria-label="fire"
          onClick={(e) => {
            handleClick("fire");
            shake(e);
          }}
        >
          {emoji[3]} {post.fireReactions}
        </Button>

        <Button
          size="xs"
          id={`${post.id}-eyes`}
          colorScheme="purple"
          aria-label="thumbsup"
          onClick={(e) => {
            handleClick("eyes");
            shake(e);
          }}
        >
          {emoji[4]} {post.eyesReactions}
        </Button>
      </HStack>
    </>
  );
};

export default ReactionEmojis;
