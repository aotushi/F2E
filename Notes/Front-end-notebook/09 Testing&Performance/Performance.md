## 图片性能优化

### 资源

> https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkxNTIwMzU5OQ==&action=getalbum&album_id=1783331624198144008&scene=173&from_msgid=2247493765&from_itemidx=1&count=3&nolastread=1#wechat_redirect



### biji 

https://mp.weixin.qq.com/s?__biz=MzkxNTIwMzU5OQ==&mid=2247493765&idx=1&sn=d8a3654ad2c2d0492ad4a539f153796b&chksm=c1601be5f61792f3efbfde8d5b75592fccc1ac871664cafb845d1e5b4f97540802e910eb9596&scene=178&cur_album_id=1783331624198144008#rdf



#### 页面图片较多,图片加载多出现出现空白闪烁等等的一些体验问题

##### 图片格式有哪些?

- jpg/jpeg

- png

- gif

- WebBP

- Avif

- Jpeg xl



##### Webp格式

> WebP 是一种现代**图像格式**，可为 Web 上的图像提供卓越的**无损和有损**压缩。使用 WebP可以创建更小、更丰富的图像，从而使 Web 更快。





##### 无损压缩 & 有损压缩

有损压缩减少了文件本身的数据量，且以牺牲图像质量为代价，因此压缩后的文件无论是在磁盘占用还是内存占用上都会比原始图像要小。

无损压缩的方法可以通过一些编码手段，用结构化的数据来减少对重复信息的磁盘占用，针对图片来说减少了图片在磁盘上的空间占用。但是并不能减少图像的内存占用量，这是因为，当从磁盘或网络请求上获取图像时，浏览器又会对图片进行解码，把丢失的像素用适当的颜色信息填充进来。

**因此如果要减少图像占用内存的容量，就必须使用有损压缩方法。**