# 前端图片上传

资料

- https://juejin.cn/post/6844903968338870285

### 1. 图片上传的两种基本方式

图片上传本质就是通过post请求发送到服务端，服务端在做相应的处理，保存文件。Content-Type的两种方式

- multipart/form-data
- application/x-www-form-urlencoded

第一种方式（multipart/form-data）

```
前端
1. 通过<input type="file"/> 上传相应的文件到浏览器

2. const formData = new FormData() 新建FormData
 
3. formData.append(file) 添加到formData提交表单中

4. 添加其他请求参数并通过axios发送相应请求

5. 根据请求结果做相应处理

后端 Koa框架服务
1. 通过koa-body中间件，对表单进行处理

2. 添加相应配置（formidable）可以将文件保存到相应文件夹中

3. 保存成功，将相应的结果返回
```

第二种方式（application/x-www-form-urlencoded）

```
前端
处理流程与上相同，唯一区别在于该方式是将图片转为base64格式再发送请求。生成base64方法：
// 文件读取
const reader = new FileReader();
// readAsDataURL主要可以将文件转为base64
reader.readAsDataURL(file);
reader.onload = (e) => {
	resolve(e.target.result);
};

后端
同样是通过koa-body进行处理，不过由于表达大小较大，需要将配置改变（formSize）。文件保存方式也要通过fs进行文件保存。服务端利用Buffer.from接受base64文件，然后做相应的文件保存处理
```



### 2. 图片缩略图

上传后缩略图也是通过上面类似操作，利用FileReader将图片展示为base64，然后再前端展示。

### 3. 多文件上传

在input标签添加multiple属性，在多文件上传的时候采用Promise.all方式和多个axios.post的方式来判断所有文件是否全部上传。

### 4. 拖拽到指定区域上传图片

主要监听`drop`事件，利用回调函数中的e.dataTransfer.files去获取拖拽的文件，然后通过axios.post发送请求

### 5. 进度管理

axios中配置onUploadProgress事件，可以监听到具体curr和total然后进行计算处理，得出具体进度。onUploadProgress 底层是xhr中的onProgrss事件

### 6. 切片处理

前端获取HASH和通过file.slice进行切片处理