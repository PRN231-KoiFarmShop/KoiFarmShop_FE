import ApiService from "./ApiService";

class FishService {
  constructor() {
    this.fishPath = "fishs/";
  }

  getFishList(pageSize = null, pageIndex = 0) {
    const params = {
      pageIndex: pageIndex,
    };

    // Only add pageSize to params if it's provided
    if (pageSize !== null) {
      params.pageSize = pageSize;
    }

    return ApiService.get(this.fishPath, { params });
  }

  getFishById(fishId) {
    return ApiService.get(`${this.fishPath}${fishId}`);
  }

  createFish(fishData) {
    return ApiService.post(this.fishPath, fishData);
  }

  updateFish(fishId, fishData) {
    return ApiService.put(`${this.fishPath}${fishId}`, fishData);
  }

  deleteFish(fishId) {
    return ApiService.delete(`${this.fishPath}${fishId}`);
  }
}

export default new FishService();
