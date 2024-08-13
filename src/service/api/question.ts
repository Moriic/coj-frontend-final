import { request } from '@/service/request';

/** get question list */
export function fetchGetQuestionVOList(params?: Api.Question.QuestionSearchParams) {
  return request<Api.Question.QuestionVOList>({
    url: '/question/list/page',
    method: 'POST',
    data: params
  });
}

export function fetchGetQuestionVOById(id?: string) {
  return request<Api.Question.QuestionVO>({
    url: 'question/get/vo',
    method: 'GET',
    params: { id }
  });
}

export function fetchSubmitQuestion(params?: Api.Question.QuestionSubmit) {
  return request({
    url: 'question/question_submit/do',
    method: 'POST',
    data: params
  });
}

export function fetchSubmitRecord(params?: Api.Question.SubmitRecordParams) {
  return request<Api.Question.QuestionSubmitVO[]>({
    url: '/question/question_submit/list/my',
    method: 'POST',
    data: params
  });
}

export function fetchUpdateQuestion(params?: Api.Question.QuestionVO) {
  return request({
    url: '/question/update',
    method: 'POST',
    data: params
  });
}
