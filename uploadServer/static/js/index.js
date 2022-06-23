// 1-单一文件上传
(function () {
  const box = document.querySelector("#box1");
  const btn_choose = box.querySelector(".choose");
  const btn_holder = box.querySelector(".holder");
  const btn_upload = box.querySelector(".upload");
  const tip = box.querySelector(".item-box-tip");
  const list = box.querySelector(".item-box-list");

  // 绑定「选择文件」事件
  btn_choose.addEventListener("click", function () {
    if (btn_choose.classList.contains("loading")) return;
    btn_holder.click();
  });

  // 「选择文件」改变事件
  btn_holder.addEventListener("change", function () {
    const file = this.files[0];
    // 文件存在
    if (!file) return;
    // 判断文件格式名是否符合规则
    const { type = "", name = "", size = 0 } = file;
    if (!/PNG|JPG|JPEG/i.test(type)) {
      alert("请选择合适的文件格式！");
      return;
    }
    if (size > 2 * 1024 * 1024) {
      alert("文件上传过大，文件上传限制为2MB");
      return;
    }
    tip.style.display = "none";
    list.innerHTML = `<div class="list-item">
      <span>${name}</span>
      <strong class="delete">移除</strong>
    </div>`;
  });

  // 「上传服务器」
  btn_upload.addEventListener("click", async function () {
    if (btn_choose.classList.contains("loading")) return;
    if (btn_holder.files.length === 0) {
      alert("请先选择文件");
      return;
    }
    isUploading(true);
    let formData = new FormData();
    const file = btn_holder.files[0];
    formData.append("file", file);
    formData.append("filename", file.name);
    await axios
      .post("/api/upload_single", formData)
      .then((data) => {
        if (data.code === 0) {
          alert(`文件上传成功，可以在${data.resourcePath}访问该图片资源`);
          removeFile();
        }
      })
      .catch((err) => {
        alert("文件上传失败，请稍候再试～");
      })
      .finally(() => {
        isUploading(false);
      });
  });

  // 「列表移除文件」
  list.addEventListener("click", function (e) {
    const { target } = e;
    if (target.tagName === "STRONG") {
      removeFile();
    }
  });

  // 移除holder中的文件
  function removeFile() {
    // 移除节点并删除文件
    list.innerHTML = "";
    btn_holder.value = null;
    tip.style.display = "block";
  }

  function isUploading(flag) {
    if (flag) {
      btn_choose.classList.add("loading");
      btn_upload.classList.add("loading");
    } else {
      btn_choose.classList.remove("loading");
      btn_upload.classList.remove("loading");
    }
  }
})();

// 2-单一文件上传base64
(function () {
  const box = document.querySelector("#box2");
  const btn_upload = box.querySelector(".upload");
  const btn_holder = box.querySelector(".holder");

  // 绑定「选择文件」事件
  btn_upload.addEventListener("click", function () {
    if (btn_upload.classList.contains("loading")) return;
    btn_holder.click();
  });

  // 「选择文件」改变事件
  btn_holder.addEventListener("change", async function () {
    const file = this.files[0];
    // 文件存在
    if (!file) return;
    // 判断文件格式名是否符合规则
    const { type = "", name = "", size = 0 } = file;
    if (!/PNG|JPG|JPEG/i.test(type)) {
      alert("请选择合适的文件格式！");
      return;
    }
    if (size > 2 * 1024 * 1024) {
      alert("文件上传过大，文件上传限制为2MB");
      return;
    }
    const base64 = await getBase64(file);
    isUploading(true);
    await axios
      .post(
        "/api/upload_single_base64",
        {
          file: encodeURIComponent(base64),
          filename: file.name,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((data) => {
        if (data.code === 0) {
          alert(`文件上传成功，可以在${data.resourcePath}访问该图片资源`);
        }
      })
      .catch((err) => {
        alert("文件上传失败，请稍候再试～");
      })
      .finally(() => {
        btn_holder.value = null;
        isUploading(false);
      });
  });
  function getBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  }

  function isUploading(flag) {
    if (flag) {
      btn_upload.classList.add("loading");
    } else {
      btn_upload.classList.remove("loading");
    }
  }
})();

// 3-缩略图展示以及前端做HASH名字处理
(function () {
  const box = document.querySelector("#box3");
  const btn_choose = box.querySelector(".choose");
  const btn_holder = box.querySelector(".holder");
  const btn_upload = box.querySelector(".upload");
  const img = box.querySelector(".item-box-img");

  // 绑定「选择文件」事件
  btn_choose.addEventListener("click", function () {
    if (btn_choose.classList.contains("loading")) return;
    btn_holder.click();
  });

  // 「选择文件」改变事件
  btn_holder.addEventListener("change", async function () {
    const file = this.files[0];
    // 文件存在
    if (!file) return;
    // 判断文件格式名是否符合规则
    const { type = "", name = "", size = 0 } = file;
    if (!/PNG|JPG|JPEG/i.test(type)) {
      alert("请选择合适的文件格式！");
      return;
    }
    if (size > 2 * 1024 * 1024) {
      alert("文件上传过大，文件上传限制为2MB");
      return;
    }
    // 进行缩略图的展示
    const previewImg = await getFileBase64(file);
    img.style.display = "block";
    img.src = previewImg;
  });

  // 「上传服务器」
  btn_upload.addEventListener("click", async function () {
    if (btn_choose.classList.contains("loading")) return;
    if (btn_holder.files.length === 0) {
      alert("请先选择文件");
      return;
    }
    isUploading(true);
    let formData = new FormData();
    const file = btn_holder.files[0];
    // 前端生成hash，由于koa-body中间件方法不好处理修改，因此还是使用后段处理
    const { filename } = await getFileBinary(file);
    file.name = filename;
    formData.append("file", file);
    formData.append("filename", filename);
    axios
      .post("/api/upload_single_name", formData)
      .then((data) => {
        if (data.code === 0) {
          img.src = "";
          img.style.display = "none";
          alert(`文件上传成功，可以在${data.resourcePath}访问该图片资源`);
        }
      })
      .catch((err) => {
        alert("文件上传失败，请稍候再试～");
      })
      .finally(() => {
        isUploading(false);
      });
  });

  function isUploading(flag) {
    if (flag) {
      btn_choose.classList.add("loading");
      btn_upload.classList.add("loading");
    } else {
      btn_choose.classList.remove("loading");
      btn_upload.classList.remove("loading");
    }
  }

  function getFileBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  }

  function getFileBinary(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        let buffer = e.target.result,
          spark = new SparkMD5.ArrayBuffer(),
          hash,
          suffix;
        // 前段进行hash处理 生成相应的hash
        spark.append(buffer);
        hash = spark.end();
        // 获取文件后缀名
        suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
        resolve({
          buffer,
          filename: `${hash}.${suffix}`,
        });
      };
    });
  }
})();

// 4-单一文件 前端展示「进度条」
// 1-单一文件上传
(function () {
  const box = document.querySelector("#box4");
  const btn_holder = box.querySelector(".holder");
  const btn_upload = box.querySelector(".upload");
  const progress = box.querySelector(".item-box-progress");

  // 绑定「选择文件」事件
  btn_upload.addEventListener("click", function () {
    if (btn_upload.classList.contains("loading")) return;
    btn_holder.click();
  });

  // 「选择文件」改变事件
  btn_holder.addEventListener("change", async function () {
    const file = this.files[0];
    // 文件存在
    if (!file) return;
    // 判断文件格式名是否符合规则
    const { type = "", name = "", size = 0 } = file;
    // 上传后发送请求
    isUploading(true);
    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);
      await axios
        .post("/api/upload_single", formData, {
          onUploadProgress(e) {
            const { loaded, total } = e;
            progress.style.width = `${(loaded / total) * 100}%`;
          },
        })
        .then((data) => {
          if (data.code === 0) {
            alert(`文件上传成功，可以在${data.resourcePath}访问该图片资源`);
          }
        });
    } catch {
      alert("文件上传失败，请稍候再试～");
    } finally {
      isUploading(false);
      progress.style.width = "0";
    }
  });

  function isUploading(flag) {
    if (flag) {
      btn_upload.classList.add("loading");
    } else {
      btn_upload.classList.remove("loading");
    }
  }
})();

// 5-多文件上传
(function () {
  const box = document.querySelector("#box5");
  const btn_choose = box.querySelector(".choose");
  const btn_holder = box.querySelector(".holder");
  const btn_upload = box.querySelector(".upload");
  const list = box.querySelector(".item-box-list");
  let _files = [];

  // 绑定「选择文件」事件
  btn_choose.addEventListener("click", function () {
    if (btn_choose.classList.contains("loading")) return;
    btn_holder.click();
  });

  // 「选择文件」改变事件
  btn_holder.addEventListener("change", function () {
    _files = Array.from(this.files);
    // 文件存在
    if (_files.length === 0) return;
    _files = _files.map((file) => {
      return {
        file,
        filename: file.name,
        key: getRandom(),
      };
    });
    // 判断文件格式名是否符合规则
    let listDom = "";
    _files.forEach((item) => {
      const { filename, key } = item;
      listDom += `<div class="list-item" key="${key}">
      <span>${filename}</span>
      <strong class="delete">移除</strong>
    </div>`;
    });
    list.innerHTML = listDom;
  });

  // 「上传服务器」
  btn_upload.addEventListener("click", async function () {
    if (btn_choose.classList.contains("loading")) return;
    if (_files.length === 0) {
      alert("请先选择文件");
      return;
    }
    isUploading(true);
    // 返回files请求promise
    filePromise = _files.map((item) => {
      const { file, filename, key } = item;
      let currItemTag = list.querySelector(`div[key="${key}"] .delete`);
      let formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);
      return axios
        .post("/api/upload_single", formData, {
          // 显示请求发送进度
          // onUploadProgress(e) { }
        })
        .then((data) => {
          if (data.code === 0) {
            if (currItemTag) {
              currItemTag.innerHTML = "100%";
            }
          }
        })
        .catch((err) => Promise.resolve(err));
    });
    console.log(filePromise);
    Promise.all(filePromise)
      .then(() => {
        alert("当前文件上传完毕");
      })
      .catch((err) => {
        alert("当前存在上传任务异常");
      })
      .finally(() => {
        isUploading(false);
      });
  });

  // 「列表移除文件」
  list.addEventListener("click", function (e) {
    const { target } = e;
    if (target.tagName === "STRONG") {
      let currItem = target.parentNode,
        key = currItem.getAttribute("key");
      list.removeChild(currItem);
      _files = _files.filter((file) => file.key !== key);
    }
  });

  // 移除holder中的文件
  function removeFile() {
    // 移除节点并删除文件
    list.innerHTML = "";
    btn_holder.value = null;
  }

  function isUploading(flag) {
    if (flag) {
      btn_choose.classList.add("loading");
      btn_upload.classList.add("loading");
    } else {
      btn_choose.classList.remove("loading");
      btn_upload.classList.remove("loading");
    }
  }

  function getRandom() {
    let temp = Math.random() * new Date();
    return temp.toString(16).replace(".", "");
  }
})();

(function () {
  let drag_area = document.querySelector("#box6");
  const btn_holder = drag_area.querySelector(".holder");
  // 注意拖拽事件触发逻辑
  // 注意浏览器默认行为的阻止
  drag_area.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  drag_area.addEventListener("drop", async function (e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    // 判断文件格式名是否符合规则
    const { type = "", name = "", size = 0 } = file;
    if (!/PNG|JPG|JPEG/i.test(type)) {
      alert("请选择合适的文件格式！");
      return;
    }
    if (size > 2 * 1024 * 1024) {
      alert("文件上传过大，文件上传限制为2MB");
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    await axios
      .post("/api/upload_single", formData)
      .then((data) => {
        if (data.code === 0) {
          alert(`文件上传成功，可以在${data.resourcePath}访问该图片资源`);
        }
      })
      .catch((err) => {
        alert("文件上传失败，请稍候再试～");
      })
      .finally(() => {
        btn_holder.value = null;
      });
  });
})();

// 6-大文件
(function () {
  const box = document.querySelector("#box7");
  const btn_upload = box.querySelector(".upload");
  const btn_holder = box.querySelector(".holder");
  btn_upload.addEventListener("click", function () {
    if (btn_upload.classList.contains("loading")) return;
    btn_holder.click();
  });
  btn_holder.addEventListener("change", async function () {
    btn_holder.classList.add("loading");
    let file = this.files[0],
      hasSentChunk = [];
    // 1. 生成文件hash用于文件标记
    let { hash, suffix } = await getFileBinary(file);
    // 2. 询问服务器未上传切片
    hasSentChunk = await axios.get("/api/upload_has_chunks", {
      hash,
    });
    const { chunks, count } = splitToChunks(file, hash, suffix);
    let isUpload = false;
    await Promise.all(chunks).then(() => {
      axios.get("/api/upload_merge", {
        params: {
          hash,
          totalChunk: count,
          suffix
        },
      }).then((data) => {
        alert(`文件上传成功，可以在${data.resourcePath}访问该图片资源`);

      });
    });

  });

  // 读取文件并获取唯一hash
  function getFileBinary(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        let buffer = e.target.result,
          spark = new SparkMD5.ArrayBuffer(),
          hash,
          suffix;
        spark.append(buffer);
        hash = spark.end();
        suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
        resolve({
          buffer,
          hash,
          suffix,
        });
      };
    });
  }

  // 文件切片处理并生成对应的promise
  function splitToChunks(file, hash, suffix) {
    // TODO: 校验chunk是否已经发送
    const maxChunkSize = 1000 * 1024; // chunk的大小为100
    let count = Math.ceil(file.size / maxChunkSize);
    let chunks = [];
    for (let i = 0; i < count; i++) {
      let formData = new FormData();
      formData.append(
        "file",
        file.slice(i * maxChunkSize, (i + 1) * maxChunkSize)
      );
      formData.append("filename", `${hash}_${i + 1}.${suffix}`);
      let chunk = axios
        .post("/api/upload_chunks", formData, {
          // 显示请求发送进度
          // onUploadProgress(e) { }
        })
        .then((data) => {
          if (data.code === 0) {

          }
        })
        .catch((err) => Promise.resolve(err));
      chunks.push(chunk);
    }
    return { chunks, count };
  }
})();
