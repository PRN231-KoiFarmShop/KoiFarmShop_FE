import React, { useState } from 'react';

const FeedbackPopup = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        // Xử lý gửi phản hồi ở đây
        console.log(`Rating: ${rating}, Comment: ${comment}`);
        // Reset form after submit if needed
        setRating(0);
        setComment('');
        onClose(); // Đóng popup sau khi gửi
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Feedback</h2>
                <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            onClick={() => handleRatingClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    rows="4"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Your feedback here..."
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPopup;
