/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'pageSize'>;

    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      pageSize: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
      userRole: string;
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  namespace Question {
    import CommonSearchParams = Api.Common.CommonSearchParams;

    /** question search params */
    type QuestionSearchParams = CommonType.RecordNullable<
      Pick<Api.Question.QuestionQueryRequest, 'title' | 'content' | 'tags'> & CommonSearchParams
    >;

    type QuestionQueryRequest = {
      answer: string;
      content: string;
      current: number;
      id: number;
      sortField: string;
      sortOrder: string;
      tags: Array<string>;
      title: string;
      userId: number;
    };

    type QuestionVOList = Common.PaginatingQueryRecord<QuestionVO>;

    type QuestionVO = {
      acceptedNum: number;
      content: string;
      createTime: string;
      favourNum: number;
      id: string;
      judgeConfig: JudgeConfig;
      submitNum: number;
      tags: Array<string>;
      thumbNum: number;
      title: string;
      updateTime: string;
      userId: number;
      userVO: UserVO;
      judgeCase: Array<JudgeCase>;
      passRate: null;
    };

    type JudgeCase = {
      input: string;
      output: string;
    };

    type JudgeConfig = {
      memoryLimit: number;
      stackLimit: number;
      timeLimit: number;
    };

    type UserVO = {
      createTime: string;
      id: number;
      userAvatar: string;
      userName: string;
      userProfile: string;
      userRole: string;
    };

    type QuestionSubmit = {
      code?: string;
      language?: string;
      questionId?: string;
    };

    type SubmitRecordParams = {
      questionId?: string;
      language?: string;
      status?: number;
      sortField?: string;
      sortOrder?: string;
    };

    type QuestionSubmitVO = {
      code?: string;
      createTime?: string;
      id?: number;
      judgeInfo?: JudgeInfo;
      errorMessage?: string;
      language?: string;
      questionId?: number;
      questionVO?: QuestionVO;
      status?: number;
      updateTime?: string;
      userId?: number;
      userVO?: UserVO;
    };

    export type JudgeInfo = {
      memory?: number;
      message?: string;
      time?: number;
    };
  }
}
