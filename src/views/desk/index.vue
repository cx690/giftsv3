<template>
  <div class="main">
    <header class="header">
      <span class="title">检索：</span>
      <div class="item">
        <a-input
          v-model:value="form.kw"
          placeholder="请输入关键字"
          style="width: 200px"
          @keyup.enter="onSearch"
        />
      </div>
      <span class="title">创建时间：</span>
      <div class="item">
        <a-range-picker
          v-model:value="form.time"
          valueFormat="YYYY-MM-DD HH:mm"
          :showTime="{
            format: 'HH:mm'
          }"
          format="YYYY-MM-DD HH:mm"
        />
      </div>
      <div class="item">
        <a-button type="primary" @click="onSearch">搜索</a-button>
        <a-button type="primary" @click="onRest">重置</a-button>
        <a-button type="primary" @click="add()">新增</a-button>
      </div>
    </header>
    <div class="total">
      <span>合计金额：￥</span>
      <span style="color: red;font-size: 16px;">{{ total }}</span>
      <span style="margin-left:20px">共计：</span>
      <span>{{ data.length }} 条数据</span>
    </div>
    <div class="content">
      <a-spin :spinning="loading" size="large">
        <a-table
          :data-source="data"
          :pagination="pagination"
          rowKey="id"
          bordered
        >
          <a-table-column key="name" title="姓名" data-index="name" />
          <a-table-column key="price" title="金额" data-index="price" />
          <a-table-column key="statusStr" title="状态" data-index="statusStr" />
          <a-table-column key="payStr" title="支付方式" data-index="payStr" />
          <a-table-column key="siginStr" title="性质" data-index="siginStr" />
          <a-table-column key="desc" title="备注" data-index="desc" />
          <a-table-column
            key="createdAt"
            title="创建时间"
            data-index="createdAt"
            width="200px"
          >
            <template #default="{text}">
              <span>{{ $moment(text).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </template>
          </a-table-column>
          <a-table-column
            key="updatedAt"
            title="修改时间"
            data-index="updatedAt"
            width="200px"
          >
            <template #default="{text}">
              <span>{{ $moment(text).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </template>
          </a-table-column>
          <a-table-column
            key="action"
            title="操作"
            data-index="action"
            width="300px"
          >
            <template #default="{record}">
              <a-popconfirm
                title="确定要删除数据吗？"
                @confirm="deleteItem(record.id)"
              >
                <a-button type="danger">删除</a-button> </a-popconfirm
              >&nbsp;&nbsp;
              <a-button type="primary" @click="add(record)">修改</a-button>
            </template>
          </a-table-column>
        </a-table>
      </a-spin>
    </div>
    <a-modal
      :title="current ? '修改数据' : '新增数据'"
      :visible="visible"
      @ok="save"
      @cancel="visible = false"
      :confirm-loading="confirmLoading"
    >
      <a-form
        ref="ruleForm"
        :model="addForm"
        :rules="rules"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-form-item name="name" label="名称">
          <a-input
            v-model:value="addForm.name"
            placeholder="请输姓名"
            class="input"
          />
        </a-form-item>
        <a-form-item name="status" label="到场状态">
          <a-radio-group
            name="sigin"
            default-value="0"
            v-model:value="addForm.status"
          >
            <a-radio value="0">
              未到场
            </a-radio>
            <a-radio value="1">
              已到场
            </a-radio>
            <a-radio value="2">
              未知
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="性质">
          <a-radio-group
            name="sigin"
            default-value="0"
            v-model:value="addForm.sigin"
          >
            <a-radio value="0">
              无
            </a-radio>
            <a-radio value="1">
              还礼
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="pay" label="支付方式">
          <a-radio-group
            name="pay"
            default-value="0"
            v-model:value="addForm.pay"
          >
            <a-radio value="0">
              现金
            </a-radio>
            <a-radio value="1">
              移动支付
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="price" label="金额">
          <a-input
            type="number"
            v-model:value="addForm.price"
            placeholder="请输金额"
            class="input"
            @blur="onBlur"
          />
        </a-form-item>
        <a-form-item name="desc" label="备注">
          <a-textarea
            :maxLength="200"
            v-model:value="addForm.desc"
            style="resize:none;width:400px;height:100px"
            placeholder="备注"
            class="input"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { saveData, getData, getOne, deleteOne } from "@/api/desk";
import { onMounted, ref, reactive, toRefs } from "vue";
import { message } from "ant-design-vue";
export default {
  name: "demo",
  setup() {
    const state = reactive({
      form: {
        kw: "",
        time: []
      },
      data: [],
      pagination: {
        pageSize: 10
      },
      total: 0,
      addForm: {
        price: "0",
        desc: "",
        name: "",
        id: "",
        sigin: "0",
        status: "0",
        pay: "0"
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名字!",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入金额!",
            trigger: "blur"
          }
        ]
      },
      visible: false,
      confirmLoading: false,
      current: null,
      loading: false
    });
    const ruleForm = ref(null);
    async function onSearch() {
      state.loading = true;
      const { code, data, message: msg, total = 0 } = await getData(state.form);
      state.loading = false;
      if (code === 200) {
        state.data = data;
      } else if (message) {
        message.error(msg);
      }
      state.total = total;
    }

    function deleteItem(id: number) {
      deleteOne({
        id
      }).then(res => {
        const { code } = res;
        if (code === 200) {
          message.success("操作成功！");
        } else {
          message.error("操作失败！");
        }
        onSearch();
      });
    }

    function save() {
      if (ruleForm.value) {
        const vm: any = ruleForm.value;
        vm.validate()
          .then(() => {
            saveData(state.addForm).then(res => {
              const { code } = res;
              if (code === 200) {
                message.success("操作成功！");
                state.visible = false;
                onSearch();
              } else {
                message.error("操作失败！");
              }
            });
          })
          .catch(() => {});
      }
    }

    function add(current = null) {
      state.current = current;
      state.visible = true;
      if (current) {
        const { price, desc, name, id, status, sigin, pay } = current as any;
        state.addForm = {
          price: price + "",
          desc,
          name,
          id,
          status,
          sigin,
          pay
        };
      } else {
        state.addForm = {
          price: "0",
          desc: "",
          name: "",
          id: "",
          sigin: "0",
          status: "0",
          pay: "0"
        };
      }
    }

    function onBlur() {
      const num = Number(state.addForm.price);
      if (isNaN(num)) {
        state.addForm.price = "0";
      } else {
        state.addForm.price = num + "";
      }
    }

    function onRest() {
      state.form.kw = "";
      state.form.time = [];
      onSearch();
    }

    onMounted(() => {
      onSearch();
    });
    return {
      ...toRefs(state),
      onSearch,
      deleteItem,
      save,
      add,
      onBlur,
      onRest,
      ruleForm
    };
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;

  .header {
    line-height: 60px;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;

    .title {
      display: inline-block;
    }

    .item {
      display: inline-block;
      margin-right: 10px;

      button {
        margin-left: 10px;
      }
    }
  }

  .total {
    line-height: 30px;
    text-indent: 10px;
  }

  .content {
    width: 100%;
    height: auto;
  }
}
</style>
