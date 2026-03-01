import React, { useState } from "react";
import { Card, Modal, ModalHeader, ModalBody, Button, TextInput } from "flowbite-react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AddCommentAPI, AllPostAPI } from "../../services/allAPIs";
import { likePostAPI } from "../../services/allAPIs";

function ProfileProjectCard({ post, refreshPosts }) {

    const token = sessionStorage.getItem("token");
    const userId = JSON.parse(sessionStorage.getItem("existingUser"))?._id;

    const [openModal, setOpenModal] = useState(false);

    const [likes, setLikes] = useState(post.likes?.length || 0);
    const [liked, setLiked] = useState(post.likes?.includes(userId));

    const [comments, setComments] = useState(post.comments || [])
    const [newComment, setNewComment] = useState("")


    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [openVideo, setOpenVideo] = useState(false);


    const handleLike = async () => {
        const updatedToken = token.replace(/"/g, "");

        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }

        try {
            const response = await likePostAPI(post._id, reqHeader);

            setLikes(response.data.likesCount)
            setLiked(response.data.liked)
            refreshPosts();
        }
        catch (err) {
            console.log("Error liking post: " + err)
        }
    }

    const handleAddComment = async () => {
        const updatedToken = token.replace(/"/g, "");

        const reqHeader = {
            Authorization: `Bearer ${updatedToken}`
        }

        if (newComment == "") {
            alert("Add a comment")
            return
        }
        try {
            const response = await AddCommentAPI(post._id, { comment: newComment }, reqHeader)
            setComments(response.data.comments)
            setNewComment("")
            refreshPosts();
        }
        catch (err) {
            console.log("Error adding comment", err)
        }
    }

    const getProfileUrl = (profile) => {
        if (!profile) return "/images/profilepic.jpg";

        if (profile.startsWith("http")) return profile;

        return `http://localhost:3000/uploads/${profile}`;
    }


    return (
        <>
            {/* PROJECT CARD */}
            <Card className="bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">

                {/* USER INFO ABOVE IMAGE */}
                {/* USER INFO */}
                <div className="flex items-center gap-3 px-6 pt-2 pb-2">
                    <img
                        src={getProfileUrl(post?.userId?.profile)}
                        className="w-12 h-12 rounded-full object-cover"
                        alt="User Avatar"
                    />

                    <p className="text-white font-semibold text-lg">
                        {post?.userId?.username || "Unknown User"}
                    </p>
                </div>

                {/* MEDIA SECTION */}
                <div className="relative w-full">

                    {(() => {
                        const media = [
                            ...(post.image || []).map(img => ({ type: "image", src: img })),
                            ...(post.video || []).map(vid => ({ type: "video", src: vid }))
                        ];

                        if (media.length === 0) {
                            return (
                                <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-xl text-gray-300">
                                    No Media Uploaded
                                </div>
                            );
                        }

                        return (
                            <div className="w-full h-64 overflow-hidden rounded-xl relative">
                                <div
                                    className="flex transition-transform duration-500"
                                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                                >
                                    {media.map((item, index) => (
                                        <div key={index} className="w-full shrink-0 h-64 relative">

                                            {item.type === "image" ? (
                                                <img
                                                    src={item.src.startsWith("http") ? item.src : `http://localhost:3000/uploads/${encodeURIComponent(item.src)}`}
                                                    className="w-full h-64 object-cover"
                                                    alt="project"
                                                />
                                            ) : (
                                                <div className="relative w-full h-full">
                                                    <video
                                                        src={item.src.startsWith("http") ? item.src : `http://localhost:3000/uploads/${encodeURIComponent(item.src)}`}
                                                        className="w-full h-full object-cover brightness-[0.65]"
                                                        muted
                                                    />
                                                    <button
                                                        onClick={() => setOpenVideo(true)}
                                                        className="absolute inset-0 flex items-center justify-center text-white bg-black/30 hover:bg-black/40 rounded-full p-4 m-auto h-fit w-fit"
                                                    >
                                                        ▶
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Left Arrow */}
                                <button
                                    onClick={() =>
                                        setCurrentImageIndex(prev =>
                                            prev === 0 ? media.length - 1 : prev - 1
                                        )
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                                >
                                    ❮
                                </button>

                                {/* Right Arrow */}
                                <button
                                    onClick={() =>
                                        setCurrentImageIndex(prev =>
                                            prev === media.length - 1 ? 0 : prev + 1
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                                >
                                    ❯
                                </button>
                            </div>
                        );
                    })()}
                </div>

                {/* Fullscreen Video Modal */}
                {openVideo && (
                    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                        <video
                            src={post.video[0].startsWith("http") ? post.video[0] : `http://localhost:3000/uploads/${encodeURIComponent(post.video[0])}`}
                            controls
                            autoPlay
                            className="w-[90%] max-w-3xl rounded-xl"
                        />


                        <button
                            onClick={() => setOpenVideo(false)}
                            className="absolute top-10 right-10 text-white text-3xl"
                        >
                            ✖
                        </button>
                    </div>
                )}



                <div className="p-6 flex flex-col grow">
                    <h5 className="text-2xl font-semibold mb-3 text-white">
                        {post.title}
                    </h5>

                    <p className="text-gray-300 mb-6 leading-relaxed grow">
                        {post.description}
                    </p>

                    <div className="flex gap-2 flex-wrap mb-2">
                        {post.techStack?.map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-cyan-800 text-gray-300 text-xs rounded-md"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>


                    <div className="flex justify-between items-center mt-auto">
                        <p className="text-xl font-bold text-white">Price: Rs {post.price}</p>

                        <div className="flex items-center gap-3">
                            {/* DETAILS BUTTON */}
                            <Link to={`/project-details/${post._id}`}>
                                <Button
                                    size="xs"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                                >
                                    Details
                                </Button>
                            </Link>


                            {/* COMMENT ICON */}
                            <AiOutlineComment
                                size={28}
                                className="text-gray-300 hover:text-white cursor-pointer"
                                onClick={() => setOpenModal(true)}
                            />

                            {/* LIKE BUTTON */}
                            <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
                                {liked ? (
                                    <FaThumbsUp size={28} className="text-blue-500" />
                                ) : (
                                    <FaRegThumbsUp size={28} className="text-gray-300 hover:text-blue-500" />
                                )}
                                <span className="text-white font-semibold">{likes}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </Card>

            {/* COMMENT MODAL */}
            <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
                <ModalHeader className="bg-gray-800 text-white rounded-t-xl" />
                <ModalBody className="bg-gray-900 text-white rounded-b-xl p-6">

                    <h3 className="text-2xl font-bold text-center mb-6">Comments</h3>

                    <div className="space-y-5 max-h-60 overflow-y-auto pr-2">

                        {
                            comments.length > 0 ?
                                comments.map(item => (
                                    <div className="flex items-start gap-3 bg-gray-800 p-3 rounded-lg">
                                        <img
                                            src={getProfileUrl(item?.userId?.profile)}
                                            className="w-10 h-10 rounded-full object-cover"
                                            alt="avatar"
                                        />

                                        <div>
                                            <p className="font-semibold text-white">{item.username}</p>
                                            <p className="text-gray-300">{item.comment}</p>
                                        </div>
                                    </div>
                                )) : "No comments...."
                        }

                    </div>

                    <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                        <p className="text-gray-400 text-center">Add Comment</p>
                        <TextInput onChange={(e) => setNewComment(e.target.value)} id="comment" name="comment" placeholder="comment..." />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button
                            onClick={handleAddComment}
                            color="blue"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            Post
                        </Button>

                        <Button
                            color="green"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => setOpenModal(false)}
                        >
                            Close
                        </Button>
                    </div>

                </ModalBody>
            </Modal>
        </>
    )
}

export default ProfileProjectCard
