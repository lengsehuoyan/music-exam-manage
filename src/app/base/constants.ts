import { environment } from '../../environments/environment';
import { QuestionType } from 'src/app/enums';

export class Constants {
  public static KQuestionType = 'k_question_type';

  public static QuestionTypeConf = ['选择题', '多选题', '拖拽'];

  // key -> desc[]
  public static textConfig: {
    [k: string]: string[] | { [k2: string]: string };
  } = {
    [Constants.KQuestionType]: Constants.QuestionTypeConf,
    // [Constants.K_AccessStatus]: Constants.UserStatusDesc,
    // [Constants.K_UserSex]: Constants.UserSexDesc,
    // [Constants.K_UserRole]: Constants.UserRoleDesc,
    // [Constants.K_UserCompletionFilter]: Constants.UserCompletionFilterDesc,
    // [Constants.K_LessonCategory]: Constants.LessonCategoryDesc,
    // [Constants.K_BannerType]: Constants.BannerTypeDesc,
    // [Constants.K_AccountChangeRecordType]: Constants.AccountChangeRecordTypeDesc,
    // [Constants.K_MasterReviewsStatus]: Constants.MasterReviewsStatusDesc,
    // [Constants.K_LanguageType]: Constants.LanguageTypeDesc,
  };

  // key -> enum
  public static valueConfig: { [k: string]: {} } = {
    [Constants.KQuestionType]: QuestionType,
    // [Constants.K_AccessStatus]: AccessStatus,
    // [Constants.K_UserSex]: UserSex,
    // [Constants.K_UserRole]: UserRole,
    // [Constants.K_UserCompletionFilter]: UserCompletionFilter,
    // [Constants.K_LessonCategory]: LessonCategory,
    // [Constants.K_BannerType]: BannerType,
    // [Constants.K_AccountChangeRecordType]: AccountChangeRecordType,
    // [Constants.K_MasterReviewsStatus]: MasterReviewsStatus,
    // [Constants.K_LanguageType]: LanguageType,
  };
}
