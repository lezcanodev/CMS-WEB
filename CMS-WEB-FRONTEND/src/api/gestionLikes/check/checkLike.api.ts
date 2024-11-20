import Api from '@/api/core/base.api';
import { checkLikeRequest, checkLikeResponse } from './checkLike.model';



export default class ApiLikeLibro extends Api<checkLikeRequest, checkLikeResponse>{

    protected async handle(query: checkLikeRequest){
        const queries = this.buildQuery(query);
        const response = await this.api.get<checkLikeResponse>(`check-like${queries}`);
        return this.data(response.data);
    }
}
