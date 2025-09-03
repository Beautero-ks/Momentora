import {SnapType} from "./snap-type.type";
import {Author} from "./author.model";

export class MomentSnap{
  id! : string;
  tags?: string[]; // this property is optional
  location?: string;// this property is optional

  constructor(
    public title: string,
    public description: string,
    public createdDate: Date,
    public author: Author,
    public imageUrl: string,
    public likes: number = 0,
    public views: number = 0,
    public downloads: number = 0,
    public resolution: string = '1920x1080',
    public fileType: string = 'jpg',
    public saves: number = 0,
    public isLiked: boolean = false,
    public isSaved: boolean = false,
    public publishedDate: Date = new Date()
  ){
    this.id = crypto.randomUUID().substring(0, 8);
  }

  addLike(){
    this.likes++
  }
  unLike(){
    this.likes--;
  }

  snaps(snapType : SnapType) {
    if (snapType === 'like') {
      this.addLike();
    } else if (snapType === 'unlike') {
      this.unLike();
    }
  }

  setLocation(location : string) : void {
    this.location = location;
  }

  withLocation(location: string): MomentSnap {
    this.setLocation(location);
    return this;
  }

  withTags(tags: string[]): MomentSnap {
    this.tags = tags;
    return this;
  }
}
