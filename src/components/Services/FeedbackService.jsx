import ApiService from "./ApiService";
class FeedbackService {
     constructor() {
          this.feedbackPath = "feedbacks/";
     }
        getFeedbackList(fishId, pageSize = null, pageIndex = 0) {
          const params = {
          fishId: fishId,
            pageIndex: pageIndex,
          };

          // Only add pageSize to params if it's provided
          if (pageSize !== null) {
            params.pageSize = pageSize;
          }

          return ApiService.get(this.feedbackPath, { params });
        }
     // getFeedbackById(fishId) {
     //      return ApiService.get(`${this.feedbackPath}${fishId}`);
     // }
}
export default new FeedbackService();
