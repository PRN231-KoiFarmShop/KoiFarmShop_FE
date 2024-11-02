import React, { useEffect, useState } from "react";
import FeedbackService from "../Services/FeedbackService";
import Rating from "./Rating";
export function KoiDetailFeedback(fishId) {
     const [feedbackData, setFeedbackData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     console.log(fishId);
     useEffect(() => {
          const fetchFeedbackData = async () => {
               try {
                    const response = await FeedbackService.getFeedbackList(fishId.fishId);
                    setFeedbackData(response.data);
               } catch (err) {
                    setError(err);
               } finally {
                    setLoading(false);
               }
          };

          fetchFeedbackData();
     }, [fishId]);

     console.log(feedbackData);
     if (loading) return <div className="text-center">Loading...</div>;
     if (error)
          return (
               <div className="text-red-500">
                    Error loading Koi details: {error.message}
               </div>
          );
     if (!feedbackData) return <div>No Koi data found.</div>;
     return (
          <div>
               {feedbackData.map((feedback, index) => (
                    <article className="w-1/2 mx-auto" key={index}>
                         <div className="flex items-center mb-4">
                              {/* <img class="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
                              <div className="font-medium dark:text-white">
                                   <p>{feedback.user.email}</p>
                              </div>
                         </div>
                         <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                              <Rating rating={feedback.rate} />
                             
                         </div>
                         <p className="mb-2 text-gray-500 dark:text-gray-400">{feedback.message}</p>

                    </article>
               ))}
          </div>
     );
}