import { request } from '@/service/request';

/** get question list */
export function fetchGetQuestionList(params?: Api.Question.QuestionSearchParams) {
  return request<Api.Question.QuestionList>({
    url: '/question/list/page/vo',
    method: 'POST',
    data: params
  });
}
