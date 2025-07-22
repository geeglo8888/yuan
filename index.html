<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的网址导航</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3B82F6',
                        danger: '#EF4444',
                    },
                }
            }
        }
    </script>
    
    <style type="text/tailwindcss">
        @layer utilities {
            .card-hover {
                @apply transition-all duration-300 hover:shadow-lg hover:-translate-y-1;
            }
            .modal-backdrop {
                @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300;
            }
            .modal-backdrop.active {
                @apply opacity-100 pointer-events-auto;
            }
            .modal-content {
                @apply bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 transform translate-y-8 transition-transform duration-300;
            }
            .modal-backdrop.active .modal-content {
                @apply translate-y-0;
            }
            .error-message {
                @apply text-danger text-sm mt-1;
            }
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-6xl mx-auto">
        <!-- 标题和管理按钮 -->
        <header class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold">我的网址导航</h1>
                <p class="text-gray-500">公开访问，管理需验证</p>
            </div>
            <button id="manageBtn" class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                <i class="fa fa-cog mr-1"></i>管理
            </button>
        </header>
        
        <!-- 添加表单（默认隐藏） -->
        <div id="addForm" class="bg-white p-4 rounded shadow mb-6 hidden">
            <h2 class="text-lg font-semibold mb-3">添加网址</h2>
            <form id="urlForm" class="flex gap-2 flex-col sm:flex-row">
                <input type="text" id="name" placeholder="网站名称" class="flex-1 p-2 border rounded">
                <input type="url" id="url" placeholder="网址" class="flex-1 p-2 border rounded">
                <button type="submit" class="bg-primary text-white px-4 py-2 rounded">添加</button>
            </form>
        </div>
        
        <!-- 网址列表 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <!-- 动态内容将通过JS加载 -->
            <div class="col-span-full text-center py-8 text-gray-500">
                <i class="fa fa-circle-o-notch fa-spin text-2xl mb-2"></i>
                <p>加载中...</p>
            </div>
        </div>
    </div>

    <!-- 管理验证弹窗 -->
    <div id="manageModal" class="modal-backdrop">
        <div class="modal-content">
            <h3 class="text-xl font-semibold mb-4">管理验证</h3>
            <form id="authForm" class="space-y-3">
                <div>
                    <label class="block text-sm mb-1">令牌</label>
                    <input type="password" id="pass" class="w-full p-2 border rounded" placeholder="输入管理令牌">
                </div>
                <!-- 错误提示区域 -->
                <div id="authError" class="error-message hidden"></div>
                <button type="submit" class="w-full bg-primary text-white p-2 rounded hover:bg-primary/90 transition-colors">验证</button>
            </form>
            <button id="closeModal" class="mt-3 w-full text-gray-500 hover:text-gray-700 transition-colors">取消</button>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let isManageMode = false;
            let manageToken = localStorage.getItem('manageToken');
            
            // DOM元素
            const manageBtn = document.getElementById('manageBtn');
            const manageModal = document.getElementById('manageModal');
            const closeModal = document.getElementById('closeModal');
            const authForm = document.getElementById('authForm');
            const authError = document.getElementById('authError');
            const addForm = document.getElementById('addForm');
            const linksContainer = document.querySelector('.grid');
            
            // 页面加载时读取KV数据并展示
            loadLinks();
            
            // 验证按钮点击
            manageBtn.addEventListener('click', function() {
                if (!isManageMode) {
                    manageModal.classList.add('active');
                    authError.classList.add('hidden');
                } else {
                    exitManageMode();
                }
            });
            
            // 关闭弹窗
            closeModal.addEventListener('click', () => manageModal.classList.remove('active'));
            manageModal.addEventListener('click', (e) => {
                if (e.target === manageModal) manageModal.classList.remove('active');
            });
            
            // 验证表单提交（简化为直接验证令牌）
            authForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const inputToken = document.getElementById('pass').value.trim();
                
                if (inputToken) {
                    manageToken = inputToken;
                    localStorage.setItem('manageToken', manageToken);
                    isManageMode = true;
                    manageModal.classList.remove('active');
                    updateUI();
                } else {
                    authError.textContent = '请输入管理令牌';
                    authError.classList.remove('hidden');
                }
            });
            
            // 退出管理模式
            function exitManageMode() {
                isManageMode = false;
                localStorage.removeItem('manageToken');
                manageToken = null;
                updateUI();
            }
            
            // 更新UI状态
            function updateUI() {
                if (isManageMode) {
                    addForm.classList.remove('hidden');
                    document.querySelectorAll('.delete-btn').forEach(btn => btn.classList.remove('hidden'));
                    manageBtn.innerHTML = '<i class="fa fa-sign-out mr-1"></i>退出管理';
                    manageBtn.classList.remove('bg-primary');
                    manageBtn.classList.add('bg-danger');
                } else {
                    addForm.classList.add('hidden');
                    document.querySelectorAll('.delete-btn').forEach(btn => btn.classList.add('hidden'));
                    manageBtn.innerHTML = '<i class="fa fa-cog mr-1"></i>管理';
                    manageBtn.classList.remove('bg-danger');
                    manageBtn.classList.add('bg-primary');
                }
            }
            
            // 从KV加载链接并渲染
            async function loadLinks() {
                try {
                    const response = await fetch('/get-urls', { cache: 'no-store' });
                    const result = await response.json();
                    
                    if (result.success) {
                        renderLinks(result.links);
                    } else {
                        linksContainer.innerHTML = `
                            <div class="col-span-full text-center py-8 text-danger">
                                <i class="fa fa-exclamation-triangle text-2xl mb-2"></i>
                                <p>加载失败: ${result.message || '未知错误'}</p>
                            </div>
                        `;
                    }
                } catch (err) {
                    console.error('加载链接失败:', err);
                    linksContainer.innerHTML = `
                        <div class="col-span-full text-center py-8 text-danger">
                            <i class="fa fa-exclamation-triangle text-2xl mb-2"></i>
                            <p>网络错误，无法加载链接</p>
                        </div>
                    `;
                }
            }
            
            // 渲染链接列表
            function renderLinks(links) {
                linksContainer.innerHTML = '';
                
                if (links.length === 0) {
                    linksContainer.innerHTML = `
                        <div class="col-span-full text-center py-8 text-gray-500">
                            <i class="fa fa-link text-2xl mb-2"></i>
                            <p>暂无链接，进入管理模式添加吧～</p>
                        </div>
                    `;
                    return;
                }
                
                links.forEach(link => {
                    const card = document.createElement('div');
                    card.className = 'bg-white p-4 rounded shadow card-hover';
                    card.innerHTML = `
                        <div class="flex justify-between">
                            <h3>${link.name}</h3>
                            <button class="delete-btn text-gray-400 hover:text-danger hidden" data-name="${link.name}">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                        <p class="text-sm text-gray-500 truncate">${link.url}</p>
                        <a href="${link.url}" target="_blank" class="text-primary text-sm hover:underline">访问</a>
                    `;
                    linksContainer.appendChild(card);
                });
                
                // 绑定删除按钮事件
                bindDeleteEvents();
            }
            
            // 绑定删除按钮事件（暂未实现后端接口，仅做前端占位）
            function bindDeleteEvents() {
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', async function() {
                        const name = this.getAttribute('data-name');
                        if (confirm(`确定要删除 ${name} 吗？`)) {
                            alert('删除功能需后端配合实现，当前仅为演示');
                            // 实际删除逻辑需调用后端接口
                            // loadLinks(); // 刷新列表
                        }
                    });
                });
            }
            
            // 修复：添加表单提交逻辑（修正ID匹配问题）
            document.getElementById('urlForm').addEventListener('submit', async function (e) {
                e.preventDefault();

                // 修复：使用正确的ID获取输入值（与HTML中的id="name"和id="url"匹配）
                const name = document.getElementById('name').value.trim();
                const url = document.getElementById('url').value.trim();

                // 表单验证
                if (!name || !url) {
                    alert('请填写名称和网址');
                    return;
                }

                // 验证管理令牌
                const token = localStorage.getItem('manageToken');
                if (!token) {
                    alert('请先验证身份');
                    return;
                }

                try {
                    // 发送添加请求到后端
                    const response = await fetch('/add-url', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // 规范的Bearer令牌格式
                        },
                        body: JSON.stringify({ name, url })
                    });

                    const result = await response.json();

                    if (response.ok && result.success) {
                        alert('添加成功！');
                        // 清空表单
                        document.getElementById('name').value = '';
                        document.getElementById('url').value = '';
                        // 重新加载列表
                        loadLinks();
                    } else {
                        alert('添加失败：' + (result.message || '未知错误'));
                    }
                } catch (err) {
                    console.error('添加请求失败:', err);
                    alert('请求出错，请稍后再试');
                }
            });

            // 初始检查：如果已有令牌，直接进入管理模式
            if (manageToken) {
                isManageMode = true;
                updateUI();
            }
        });
    </script>
</body>
</html>
