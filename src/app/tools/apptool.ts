import { Constants, LabelOption } from '../base';
import { map } from 'rxjs/operators';
// import { plainToClass } from 'class-transformer';
// import { ClassType } from 'class-transformer/ClassTransformer';

export class AppTool {
  static getActionText(value: any): string {
    return value ? '编辑' : '新建';
  }

  // static transObj<T>(cls: ClassType<T>) {
  //   return map((data) => plainToClass(cls, data));
  // }

  // static transTable<T>(cls: ClassType<T>) {
  //   return map(({ data, total }) => ({
  //     totalPage: parseInt(total, 10),
  //     list: plainToClass(cls, data as []),
  //   }));
  // }

  static listConfig(type: string, excludeIds: number[] = []): LabelOption[] {
    excludeIds = excludeIds || [];
    const labels: LabelOption[] = [];
    const enumObj = Constants.valueConfig[type];
    const keys = Object.keys(enumObj);
    keys.forEach((key) => {
      const numKey = parseInt(key, 10);
      if (!isNaN(numKey) && !excludeIds.includes(numKey)) {
        labels.push({ label: this.description(type, numKey), value: numKey });
      }
    });
    return labels;
  }

  static description(type: string, value: number): string {
    const textConf = Constants.textConfig[type];
    return textConf ? textConf[value] : '-';
  }

  static getExtName(filename: string): string {
    if (!filename) {
      return '';
    }
    const arr = filename.split('.');
    if (arr && arr.length) {
      return arr.pop();
    }
    return '';
  }
}
