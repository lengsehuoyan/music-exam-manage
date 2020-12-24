/**
 * <p><code>Rectangle</code> 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。</p>
 * <p>Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。</p>
 */
export class Rectangle {
  /**
   * 矩形左上角的 X 轴坐标。
   */
  public x: number;
  /**
   * 矩形左上角的 Y 轴坐标。
   */
  public y: number;
  /**
   * 矩形的宽度。
   */
  public width: number;
  /**
   * 矩形的高度。
   */
  public height: number;

  /**
   * 创建一个 <code>Rectangle</code> 对象。
   * @param	x 矩形左上角的 X 轴坐标。
   * @param	y 矩形左上角的 Y 轴坐标。
   * @param	width 矩形的宽度。
   * @param	height 矩形的高度。
   */
  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * 此矩形右侧的 X 轴坐标。 x 和 width 属性的和。
   */
  public get right(): number {
    return this.x + this.width;
  }

  /**
   * 此矩形底端的 Y 轴坐标。y 和 height 属性的和。
   */
  public get bottom(): number {
    return this.y + this.height;
  }

  /**
   * 将 Rectangle 的属性设置为指定值。
   * @param	x	x 矩形左上角的 X 轴坐标。
   * @param	y	x 矩形左上角的 Y 轴坐标。
   * @param	width	矩形的宽度。
   * @param	height	矩形的高。
   * @return	返回属性值修改后的矩形对象本身。
   */
  public setTo(x: number, y: number, width: number, height: number): Rectangle {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * 复制 source 对象的属性值到此矩形对象中。
   * @param	sourceRect	源 Rectangle 对象。
   * @return	返回属性值修改后的矩形对象本身。
   */
  public copyFrom(source: Rectangle): Rectangle {
    this.x = source.x;
    this.y = source.y;
    this.width = source.width;
    this.height = source.height;
    return this;
  }

  /**
   * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
   * @param x	点的 X 轴坐标值（水平位置）。
   * @param y	点的 Y 轴坐标值（垂直位置）。
   * @return	如果 Rectangle 对象包含指定的点，则值为 true；否则为 false。
   */
  public contains(x: number, y: number): boolean {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x < this.right) {
      if (y >= this.y && y < this.bottom) {
        return true;
      }
    }
    return false;
  }

  /**
   * 确定在 rect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
   * @param	rect Rectangle 对象。
   * @return	如果传入的矩形对象与此对象相交，则返回 true 值，否则返回 false。
   */
  public intersects(rect: Rectangle): boolean {
    const { x, y, width, height } = this;
    return !(
      rect.x > x + width ||
      rect.x + rect.width < this.x ||
      rect.y > y + height ||
      rect.y + rect.height < this.y
    );
  }

  /**
   * 如果在 rect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，则此方法返回null。
   * @param rect	待比较的矩形区域。
   * @param out	（可选）待输出的矩形区域。如果为空则创建一个新的。建议：尽量复用对象，减少对象创建消耗。
   * @return	返回相交的矩形区域对象。
   */
  public intersection(rect: Rectangle, out: Rectangle = null): Rectangle {
    if (!this.intersects(rect)) {
      return null;
    }

    out.x = Math.max(this.x, rect.x);
    out.y = Math.max(this.y, rect.y);
    out.width = Math.min(this.right, rect.right) - out.x;
    out.height = Math.min(this.bottom, rect.bottom) - out.y;
    return out;
  }

  /**
   * <p>矩形联合，通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。</p>
   * <p>注意：union() 方法忽略高度或宽度值为 0 的矩形，如：var rect2:Rectangle = new Rectangle(300,300,50,0);</p>
   * @param	要添加到此 Rectangle 对象的 Rectangle 对象。
   * @param	out	用于存储输出结果的矩形对象。如果为空，则创建一个新的。建议：尽量复用对象，减少对象创建消耗。Rectangle.TEMP对象用于对象复用。
   * @return	充当两个矩形的联合的新 Rectangle 对象。
   */
  public union(source: Rectangle, out: Rectangle = null): Rectangle {
    if (!out) {
      out = new Rectangle();
    }
    this.clone(out);
    if (source.width <= 0 || source.height <= 0) {
      return out;
    }
    out.addPoint(source.x, source.y);
    out.addPoint(source.right, source.bottom);
    return this;
  }

  /**
   * 返回一个 Rectangle 对象，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
   * @param out	（可选）用于存储结果的矩形对象。如果为空，则创建一个新的。建议：尽量复用对象，减少对象创建消耗。。Rectangle.TEMP对象用于对象复用。
   * @return Rectangle 对象，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
   */
  public clone(out: Rectangle = null): Rectangle {
    const { x, y, width, height } = this;
    if (!out) {
      out = new Rectangle();
    }
    out.x = x;
    out.y = y;
    out.width = width;
    out.height = height;
    return out;
  }

  /**
   * 当前 Rectangle 对象的水平位置 x 和垂直位置 y 以及高度 width 和宽度 height 以逗号连接成的字符串。
   */
  public toString(): string {
    const { x, y, width, height } = this;
    return x + ',' + y + ',' + width + ',' + height;
  }

  /**
   * 检测传入的 Rectangle 对象的属性是否与当前 Rectangle 对象的属性 x、y、width、height 属性值都相等。
   * @param	rect 待比较的 Rectangle 对象。
   * @return	如果判断的属性都相等，则返回 true ,否则返回 false。
   */
  public equals(rect: Rectangle): boolean {
    const { x, y, width, height } = this;
    if (
      !rect ||
      rect.x !== x ||
      rect.y !== y ||
      rect.width !== width ||
      rect.height !== height
    ) {
      return false;
    }
    return true;
  }

  /**
   * <p>为当前矩形对象加一个点，以使当前矩形扩展为包含当前矩形和此点的最小矩形。</p>
   * <p>此方法会修改本对象。</p>
   * @param x	点的 X 坐标。
   * @param y	点的 Y 坐标。
   * @return 返回此 Rectangle 对象。
   */
  public addPoint(x: number, y: number): Rectangle {
    // 左边界比较
    if (this.x > x) {
      this.width += this.x - x;
      this.x = x;
    }
    // 上边界比较
    if (this.y > y) {
      this.height += this.y - y;
      this.y = y;
    }
    if (this.width < x - this.x) {
      // 右边界比较
      this.width = x - this.x;
    }
    if (this.height < y - this.y) {
      // 下边界比较
      this.height = y - this.y;
    }
    return this;
  }

  /**
   * 确定此 Rectangle 对象是否为空。
   * @return 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
   */
  public isEmpty(): boolean {
    if (this.width <= 0 || this.height <= 0) {
      return true;
    }
    return false;
  }
}
