import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, TextInput } from "flowbite-react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AddCommentAPI, AllPostAPI } from "../../services/allAPIs";
import { likePostAPI } from "../../services/allAPIs";


function ProjectCard({ post, refreshPosts }) {
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
        if (!profile || profile.trim() === "")
            return "/images/profilepic.jpg";

        if (profile.startsWith("http"))
            return profile;

        if (profile.startsWith("uploads/"))
            return `http://localhost:3000/${profile}`;

        return `http://localhost:3000/uploads/${profile}`;
    };




    return (
        <>
            {/* PROJECT CARD - Modern LinkedIn Style */}
            <div className="bg-slate-50 hover:bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] border border-gray-200 transition-all duration-300 flex flex-col overflow-hidden group hover:border-gray-300">

                {/* Header Section */}
                <div className="flex items-center gap-3 px-5 pt-5 pb-4">
                    <div className="relative">
                        <img
                            src={getProfileUrl(post?.userId?.profile)}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 hover:ring-blue-200 transition-all"
                            alt="User Avatar"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-semibold text-[15px] leading-tight truncate hover:text-[#0A66C2] transition-colors cursor-pointer">
                            {post?.userId?.username || "Unknown User"}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">Posted a project • {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown Date"}</p>
                    </div>
                </div>

                {/* Media Section */}
                <div className="relative w-full bg-gray-50">
                    {(() => {
                        const media = [
                            ...(post.image || []).map(img => ({ type: "image", src: img })),
                            ...(post.video || []).map(vid => ({ type: "video", src: vid }))
                        ];

                        if (media.length === 0) {
                            return (
                                <div className="w-full h-72 bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-3">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium">No media available</p>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div className="w-full h-72 overflow-hidden relative group/media bg-black">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out h-full"
                                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                                >
                                    {media.map((item, index) => (
                                        <div key={index} className="w-full shrink-0 h-72 relative">
                                            {item.type === "image" ? (
                                                <img
                                                    src={item.src.startsWith("http") ? item.src : `http://localhost:3000/uploads/${encodeURIComponent(item.src)}`}
                                                    className="w-full h-full object-cover"
                                                    alt="project"
                                                />
                                            ) : (
                                                <div className="relative w-full h-full">
                                                    <video
                                                        src={item.src.startsWith("http") ? item.src : `http://localhost:3000/uploads/${encodeURIComponent(item.src)}`}
                                                        className="w-full h-full object-cover"
                                                        muted
                                                    />
                                                    <button
                                                        onClick={() => setOpenVideo(true)}
                                                        className="absolute inset-0 flex items-center justify-center text-white bg-black/30 hover:bg-black/40 rounded-full p-5 m-auto h-fit w-fit transition-all duration-200 backdrop-blur-sm"
                                                    >
                                                        <div className="bg-white/20 rounded-full p-3">
                                                            <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Buttons */}
                                {media.length > 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setCurrentImageIndex(prev =>
                                                    prev === 0 ? media.length - 1 : prev - 1
                                                )
                                            }
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg opacity-0 group-hover/media:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                                            aria-label="Previous"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentImageIndex(prev =>
                                                    prev === media.length - 1 ? 0 : prev + 1
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg opacity-0 group-hover/media:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                                            aria-label="Next"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })()}
                </div>

                {/* Fullscreen Video Modal */}
                {openVideo && (
                    <div className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                        <div className="relative w-full max-w-5xl">
                            <video
                                src={post.video[0].startsWith("http") ? post.video[0] : `http://localhost:3000/uploads/${encodeURIComponent(post.video[0])}`}
                                controls
                                autoPlay
                                className="w-full rounded-xl shadow-2xl"
                            />
                            <button
                                onClick={() => setOpenVideo(false)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2.5 transition-all"
                                aria-label="Close"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Content Section */}
                <div className="px-5 py-4 flex flex-col grow">
                    <h5 className="text-lg font-semibold mb-2.5 text-gray-900 line-clamp-2 leading-snug hover:text-[#0A66C2] transition-colors cursor-pointer">
                        {post.title}
                    </h5>

                    <p className="text-gray-700 mb-4 leading-relaxed text-sm line-clamp-3 grow">
                        {post.description}
                    </p>

                    {/* Tech Stack Tags */}
                    {post.techStack && post.techStack.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-4">
                            {post.techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-[#E8F4F8] text-[#0A66C2] text-xs font-medium rounded-full border border-[#CEE7F0] hover:bg-[#D0E8F2] transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Price Badge */}
                    <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 text-xs font-medium">Price:</span>
                            <span className="text-lg font-bold text-gray-900">Rs {post.price}</span>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                            {/* Like Button */}
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 transition-all px-3 py-2 rounded-md ${liked
                                    ? 'text-[#0A66C2] bg-blue-50'
                                    : 'text-gray-600 hover:text-[#0A66C2] hover:bg-blue-50'
                                    }`}
                                aria-label="Like"
                            >
                                {liked ? (
                                    <FaThumbsUp size={18} />
                                ) : (
                                    <FaRegThumbsUp size={18} />
                                )}
                                <span className="text-sm font-medium">{likes}</span>
                            </button>

                            {/* Comment Button */}
                            <button
                                onClick={() => setOpenModal(true)}
                                className="flex items-center gap-2 text-gray-600 hover:text-[#0A66C2] transition-all px-3 py-2 rounded-md hover:bg-blue-50"
                                aria-label="Comments"
                            >
                                <AiOutlineComment size={18} />
                                <span className="text-sm font-medium">{comments.length}</span>
                            </button>
                        </div>

                        {/* Details Button */}
                        <Link to={`/project-details/${post._id}`}>
                            <button className="px-5 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-md text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* COMMENT MODAL - Modern Design */}
            <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
                <ModalHeader className="bg-white border-b border-gray-200 rounded-t-lg px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
                        <button
                            onClick={() => setOpenModal(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </ModalHeader>
                <ModalBody className="bg-[#F3F2EF] rounded-b-lg p-6">

                    {/* Comments List */}
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
                        {comments.length > 0 ? (
                            comments.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-xs hover:shadow-sm transition-all"
                                >
                                    <img
                                        src={getProfileUrl(item?.userId?.profile)}
                                        className="w-11 h-11 rounded-full object-cover border-2 border-gray-200 shrink-0 ring-1 ring-gray-100"
                                        alt="avatar"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 text-sm mb-1.5">{item.username}</p>
                                        <p className="text-gray-700 text-sm leading-relaxed wrap-break-word">{item.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-sm font-medium mb-1">No comments yet</p>
                                <p className="text-gray-500 text-xs">Be the first to share your thoughts!</p>
                            </div>
                        )}
                    </div>

                    {/* Add Comment Section */}
                    <div className="border-t border-gray-300/60 pt-5">
                        <div className="flex items-start gap-3 mb-4">
                            <img
                                src={getProfileUrl(JSON.parse(sessionStorage.getItem('existingUser'))?.profile)}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shrink-0"
                                alt="Your avatar"
                            />
                            <div className="flex-1">
                                <TextInput
                                    onChange={(e) => setNewComment(e.target.value)}
                                    value={newComment}
                                    id="comment"
                                    name="comment"
                                    placeholder="Write a comment..."
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddComment}
                                className="px-5 py-2 text-sm font-semibold bg-[#0A66C2] hover:bg-[#004182] text-white rounded-md transition-all shadow-sm hover:shadow-md"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </>
    );
}

export default ProjectCard;
