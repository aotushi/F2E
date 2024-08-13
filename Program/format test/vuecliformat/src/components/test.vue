let a = b; let c = d;
<!-- 附加任务报工明细 -->
<template>
  <div
    v-loading.fullscreen.lock="pageLoading"
    element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-container>
      <el-aside width="230px">
        <el-form ref="form" :model="leftFormData" label-width="60px">
          <el-form-item label="车间:">
            <el-select
              v-model="leftFormData.workShop"
              clearable
              placeholder="请选择接收车间"
              style="width: 100%"
              @change="(val) => workShopSelectChange(val, 'workShop')"
            >
              <el-option v-for="(opt, i) in workShopOptList" :key="'opt' + i" :value="opt.value" :label="opt.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="班组:">
            <el-select
              v-model="leftFormData.teamList"
              multiple
              clearable
              @change="(val) => teamSelectChange(val, 'team')"
            >
              <el-option
                v-for="(item, key) in groupOptionsList"
                :key="'opt' + key"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="hideLeft" label="操作者:">
            <el-checkbox-group v-model="leftFormData.perNameList" @change="checkboxChange">
              <el-checkbox
                v-for="(item, key) in userOptionsList"
                :key="'che' + key"
                :label="item.label"
                :name="item.value"
              />
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main>
        <SimContainer
          :button-affairs="[]"
          :search-object="listQuery"
          :search-props="searchProps"
          :show-table="false"
          :excel-config-option="{
            exportShow: true,
            importShow: false,
            customExportFunction: true,
          }"
          :inline-num="5"
          :table-props="tableProps"
          :table-data="tableData"
          :table-data-total="tableDataTotal"
          :table-config="tableConfig"
          @search="loadTable"
          @simCheck="handleCheck"
          @handleSelectionChange="(data) => (selectedData = data)"
          @sim-form-change="handleAppendClick"
          @exportFiles="handleExportFiles"
        >
          <div slot="main" style="padding-bottom: 10px">
            <el-button
              v-for="(item, key) in filterButtonAffairs"
              :key="'btn' + key"
              v-permission="item.permission"
              size="mini"
              :type="item.type"
              :icon="item.icon"
              @click="handleBtnClick(item.affairs)"
              >{{ item.name }}</el-button
            >
          </div>
        </SimContainer>
        <el-tabs v-model="activeName" style="margin-top: 5px" type="border-card" @tab-click="tabsChange">
          <el-tab-pane label="待确认" name="1">
            <UndeterminedDetails
              ref="undeterminedRef"
              @handleCheck="handleCheck"
              @selectionChangeList="selectionChangeList"
            />
          </el-tab-pane>
          <el-tab-pane label="车间审核" name="2">
            <UncheckedDetails
              ref="uncheckedRef"
              @handleCheck="handleCheck"
              @selectionChangeList="selectionChangeList"
            />
          </el-tab-pane>
          <el-tab-pane label="进行中" name="3">
            <UnderwayDetails ref="underwayRef" @handleCheck="handleCheck" @selectionChangeList="selectionChangeList" />
          </el-tab-pane>
          <el-tab-pane label="完成" name="4">
            <CompDetails ref="compRef" @handleCheck="handleCheck" @selectionChangeList="selectionChangeList" />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <!-- 附加任务工时修改 -->
    <el-dialog title="附加任务工时修改" :visible.sync="editDialogVisible" width="75%">
      <div style="padding: 10px 0 0" class="editClass">
        <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="派工单号:" prop="orderNumber">
                <el-input v-model="addForm.orderNumber" disabled placeholder="根据编码规则，自动获取新增" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-divider content-position="left">基础信息</el-divider>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务类型:" prop="orderType">
                <!-- <el-select v-model="addForm.orderType" clearable placeholder="请选择任务类型" style="width: 100%;">
                                    <el-option :value="opt.value" :label="opt.label" v-for="(opt, i) in orderTypeOptList"
                                        :key="'opt' + i"></el-option>
                                </el-select> -->
                <template v-for="(o, i) in orderTypeOptList">
                  <template v-if="o.value">
                    <span v-show="addForm.orderType === o.value" :key="i">
                      {{ o.label }}
                    </span>
                  </template>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务名称:" prop="orderName">
                <!-- <el-input v-model="addForm.orderName" clearable></el-input> -->
                <span>{{ addForm.orderName }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项号:" prop="projectNumber">
                <!-- <el-input v-model="addForm.projectNumber" clearable></el-input> -->
                <span>{{ addForm.projectNumber }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态:" prop="reportStatus">
                <!-- <el-input v-model="addForm.projectNumber" clearable></el-input> -->
                <template v-for="(o, i) in orderStatusOptList">
                  <template v-if="o.value">
                    <span v-show="addForm.reportStatus === o.value" :key="i">
                      {{ o.label }}
                    </span>
                  </template>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="派工数量:" prop="personnelQty">
                <!-- <el-input v-model="addForm.personnelQty" clearable></el-input> -->
                <span>{{ addForm.personnelQty }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备:" prop="projectNumber">
                <!-- <el-input v-model="addForm.projectNumber" clearable></el-input> -->
                <span>{{ addForm.equName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车间:" prop="workShopDesc">
                <!-- <el-select v-model="addForm.workShop" clearable placeholder="请选择接收车间" style="width: 100%;"
                                    @change="val => selectChange(val, 'workShop')">
                                    <el-option :value="opt.value" :label="opt.label" v-for="(opt, i) in workShopOptList"
                                        :key="'opt' + i"></el-option>
                                </el-select> -->
                <span>{{ addForm.workShopDesc }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班组:" prop="teamDesc">
                <!-- <el-input v-model="addForm.jobNumber" clearable></el-input> -->
                <span>{{ addForm.teamDesc }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发出部门:" prop="issueCode">
                <!-- <el-select v-model="addForm.issueCode" style="width: 100%;" clearable
                                    @change="val => selectChange(val, 'issueCode')">
                                    <el-option :value="opt.value" :label="opt.label" v-for="(opt, i) in departmentLists"
                                        :key="'opt' + i"></el-option>
                                </el-select> -->
                <span>{{ addForm.issueName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完工日期:" prop="completTime">
                <!-- <el-date-picker type="datetime" placeholder="选择日期" v-model="addForm.completTime"
                                    style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" /> -->
                <span>{{ addForm.completTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="班组备注:" prop="teamDetailed">
                <!-- <el-input v-model="addForm.detailed" clearable type="textarea" rows="3"></el-input> -->
                <span>{{ addForm.teamDetailed }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细说明:" prop="detailed">
                <!-- <el-input v-model="addForm.detailed" clearable type="textarea" rows="3"></el-input> -->
                <span>{{ addForm.detailed }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工艺工时:" prop="processTime">
                <!-- <el-input v-model="addForm.processTime" clearable></el-input> -->
                <span>{{ addForm.processTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参考工时:" prop="actualTime">
                <el-input-number
                  v-model="addForm.actualTime"
                  :precision="2"
                  :controls="false"
                  :min="0"
                  :disabled="addForm.processTime ? true : false"
                  @change="handleChangeActualTime"
                />
                <span style="color: red; margin-left: 5px">注：参考工时填写1个数量所代表的工时</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="reportTableData" border height="350px" style="width: 100%; margin-top: 20px">
          <el-table-column type="index" label="序号" align="center" width="55" />
          <el-table-column prop="personnelNumber" label="派工任务单号" align="center" min-width="100" />
          <el-table-column prop="orderName" label="任务名称" align="center" min-width="100" />
          <el-table-column prop="projectNumber" label="项号" align="center" min-width="100" />
          <el-table-column prop="jobNumber" label="工作号" align="center" min-width="100" />
          <el-table-column prop="mapNumber" label="图号" align="center" min-width="100" />
          <el-table-column prop="perCode" label="人员工号" align="center" min-width="100" />
          <el-table-column prop="perName" label="人员名称" align="center" min-width="100" />
          <el-table-column prop="distributionMol" label="工时分配" align="center" min-width="150">
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.distributionMol" /> -->
              <el-input-number v-model="scope.row.distributionMol" :precision="4" :controls="false" :min="0" />
            </template>
          </el-table-column>
          <el-table-column prop="laborHour" label="工时" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row | manHourFilter }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="editTableSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 附加任务人员报工 -->
    <el-dialog title="附加任务人员报工" :visible.sync="reportDialogVisible" width="80%">
      <div style="padding: 10px 0 0">
        <p style="padding: 10px 0 10px">
          <el-button type="primary" :loading="saveLoading" @click="reportClickBtn">报工确认</el-button>
          <el-button type="danger" @click="reportDialogVisible = false">取消确认</el-button>
        </p>
        <el-table :data="reportTableData" border height="350px" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="55" />
          <el-table-column prop="personnelNumber" label="派工单号" align="center" min-width="100" />
          <el-table-column prop="perCode" label="人员工号" align="center" min-width="100" />
          <el-table-column prop="perName" label="人员名称" align="center" min-width="100" />
          <el-table-column prop="distributionMol" label="分配工时" align="center" min-width="100" />
          <el-table-column prop="laborHour" label="工时" align="center" min-width="100" />
          <el-table-column prop="personnelQty" label="派工数量" align="center" min-width="100" />
          <el-table-column prop="residueQty" label="派工剩余数量" align="center" min-width="100" />
          <el-table-column prop="processTime" label="工艺工时" align="center" min-width="100" />
          <el-table-column prop="actualTime" label="参考工时" align="center" min-width="100" />
          <el-table-column prop="teamNumber" label="子任务单号" align="center" min-width="100" />
          <el-table-column prop="orderType" label="任务类型" align="center" min-width="100">
            <template slot-scope="scope">
              <template v-for="(o, i) in orderTypeOptList">
                <template v-if="o.value">
                  <span v-show="scope.row.orderType === o.value" :key="i">
                    {{ o.label }}
                  </span>
                </template>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="orderName" label="任务名称" align="center" min-width="100" />
          <el-table-column prop="workShopDesc" label="车间" align="center" min-width="100" />
          <el-table-column prop="teamDesc" label="班组" align="center" min-width="100" />
          <el-table-column prop="teamDetailed" label="班组备注" align="center" min-width="100" />
          <el-table-column prop="projectNumber" label="项号" align="center" min-width="100" />
          <el-table-column prop="jobNumber" label="工作号" align="center" min-width="100" />
          <el-table-column prop="mapNumber" label="图号" align="center" min-width="100" />
          <el-table-column prop="completTime" label="完工日期" align="center" min-width="100" />
          <el-table-column prop="equName" label="设备名称" align="center" min-width="100" />
        </el-table>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="报工任务明细查看" :visible.sync="cheackDialogVisible" width="75%">
      <div style="padding: 10px 0; font-size: 16px">
        任务单号:
        <span style="display: inline-block; margin-left: 10px; font-size: 20px"> {{ checkRowList.orderNumber }} </span>
      </div>
      <fieldset style="border: 1px solid #efe7e7; padding: 10px 20px; margin-top: 5px">
        <legend style="padding: 0 10px">车间信息</legend>
        <el-descriptions :column="2">
          <el-descriptions-item label="任务类型">
            <template v-for="(o, i) in orderTypeOptList">
              <template v-if="o.value">
                <span v-show="workshopList.orderType === o.value" :key="i">
                  {{ o.label }}
                </span>
              </template>
            </template></el-descriptions-item
          >
          <el-descriptions-item label="任务名称">{{ workshopList.orderName }}</el-descriptions-item>
          <el-descriptions-item label="项号">{{ workshopList.projectNumber }}</el-descriptions-item>
          <el-descriptions-item label="工作号">{{ workshopList.jobNumber }}</el-descriptions-item>
          <el-descriptions-item label="图号">{{ workshopList.mapNumber }}</el-descriptions-item>
          <el-descriptions-item label="数量">{{ workshopList.qty }}</el-descriptions-item>
          <el-descriptions-item label="接收车间">{{ workshopList.workShopDesc }}</el-descriptions-item>
          <el-descriptions-item label="发出部门">{{ workshopList.issueName }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <template v-for="(o, i) in orderStatusAllList">
              <template v-if="o.value">
                <span v-show="workshopList.orderStatus === o.value" :key="i">
                  {{ o.label }}
                </span>
              </template>
            </template>
            <!-- <span>{{ workshopList.orderStatus }}</span> -->
          </el-descriptions-item>
          <el-descriptions-item label="完工日期">{{ workshopList.completTime }}</el-descriptions-item>
          <el-descriptions-item label="详细说明" :span="2">{{ workshopList.detailed }}</el-descriptions-item>
          <el-descriptions-item label="创建人">{{ workshopList.createUser }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ workshopList.createTime }}</el-descriptions-item>
          <el-descriptions-item label="修改人">{{ workshopList.updateUser }}</el-descriptions-item>
          <el-descriptions-item label="修改时间">{{ workshopList.updateTime }}</el-descriptions-item>
          <!-- <el-descriptions-item :label="item.label" v-for="(item,key) in tableProps" :key="'desc'+key">{{ checkRowList[item.prop] }}</el-descriptions-item>   -->
          <el-descriptions-item v-if="workshopList.fileOnr" label="附件1" :span="2">
            <el-link :href="httpUrl + '/files' + workshopList.fileOnr" target="_blank" type="primary">{{
              workshopList.fileOnr
            }}</el-link>
          </el-descriptions-item>
          <el-descriptions-item v-if="workshopList.fileTwo" label="附件2" :span="2">
            <el-link :href="httpUrl + '/files' + workshopList.fileTwo" target="_blank" type="primary">{{
              workshopList.fileTwo
            }}</el-link>
          </el-descriptions-item>
          <el-descriptions-item v-if="workshopList.fileThree" label="附件3" :span="2">
            <el-link :href="httpUrl + '/files' + workshopList.fileThree" target="_blank" type="primary">{{
              workshopList.fileThree
            }}</el-link>
          </el-descriptions-item>
        </el-descriptions>
      </fieldset>

      <fieldset style="border: 1px solid #efe7e7; padding: 10px 20px; margin: 20px 0">
        <legend style="padding: 0 10px">班组信息</legend>
        <el-descriptions :column="2">
          <el-descriptions-item label="子任务单号" :span="2">{{
            teamList.teamNumber + "_" + teamList.teamNo
          }}</el-descriptions-item>
          <el-descriptions-item label="班组编码">{{ teamList.team }}</el-descriptions-item>
          <el-descriptions-item label="班组名称">{{ teamList.teamDesc }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <template v-for="(o, i) in orderStatusAllList">
              <template v-if="o.value">
                <span v-show="teamList.teamStatus === o.value" :key="i">
                  {{ o.label }}
                </span>
              </template>
            </template>
          </el-descriptions-item>
          <el-descriptions-item label="剩余派工数量">{{ teamList.residueQty }}</el-descriptions-item>
          <el-descriptions-item label="工艺工时">{{ teamList.processTime }}</el-descriptions-item>
          <el-descriptions-item label="参考工时">{{ teamList.actualTime }}</el-descriptions-item>
          <el-descriptions-item label="班组备注" :span="2">{{ teamList.teamDetailed }}</el-descriptions-item>
          <el-descriptions-item label="创建人">{{ teamList.createUser }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ teamList.createTime }}</el-descriptions-item>
          <el-descriptions-item label="修改人">{{ teamList.updateUser }}</el-descriptions-item>
          <el-descriptions-item label="修改时间">{{ teamList.updateTime }}</el-descriptions-item>
        </el-descriptions>
      </fieldset>
      <el-divider style="margin-top: 10px" content-position="left">报工任务明细查看</el-divider>
      <div style="padding: 10px 0; font-size: 16px">派工单号: {{ checkRowList.personnelNumber }}</div>
      <el-table :data="reportTableData" border height="350px" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="55" />
        <el-table-column prop="reportQty" label="报工数量" align="center" min-width="100" />
        <el-table-column prop="reportStatus" label="报工状态" align="center" min-width="100">
          <template slot-scope="scope">
            <template v-for="(o, i) in orderStatusAllList">
              <template v-if="o.value">
                <span v-show="scope.row.reportStatus === o.value" :key="i">
                  {{ o.label }}
                </span>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="equUser" label="设备编码" align="center" min-width="100" />
        <el-table-column prop="equName" label="设备名称" align="center" min-width="100" />
        <el-table-column prop="perCode" label="人员工号" align="center" min-width="100" />
        <el-table-column prop="perName" label="人员名称" align="center" min-width="100" />
        <el-table-column prop="distributionMol" label="分配工时" align="center" min-width="100" />
        <el-table-column prop="createUser" label="报工人名称" align="center" min-width="100" />
        <el-table-column prop="createTime" label="报工时间" align="center" min-width="130" />
        <el-table-column prop="updateUser" label="更新人" align="center" min-width="100" />
        <el-table-column prop="updateTime" label="修改时间" align="center" min-width="130" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cheackDialogVisible = false">关 闭</el-button>
        <!-- <el-button type="primary" :loading="saveLoading" @click="addNewDialogSave">确 定</el-button> -->
      </span>
    </el-dialog>
    <!-- 自定义文本 -->
    <el-dialog title="输入文本" :visible.sync="enterDialogVisible" width="40%">
      <div style="padding: 20px 0">
        <el-input v-model="textareaValue" type="textarea" :rows="10" placeholder="请输入内容" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="enterDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="enterDialogSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CompDetails from "./components/compDetails";
import UncheckedDetails from "./components/uncheckedDetails";
import UnderwayDetails from "./components/underwayDetails";
import UndeterminedDetails from "./components/undeterminedDetails";
import { getDictionary } from "@/api/dictionary";
import permission from "@/directive/permission";
import {
  // pageJdTeamAdditionalTaskPersonnelVo,
  queryByPage,
  postTaskReportEdit,
  editJdAdditionalTaskReport,
  editTeamAdditionalTask,
  listJdShopAdditionalTask,
  queryByIdTeam,
  cancelReportByPersonnelIds,
  cancelConfirmById,
  jdTeamAdditionalTaskPersonnelExport,
} from "@/api/service-module/jmsjd/additionalTaskReportingDetails";
import { formatDate } from "@/utils/formatData";
import {
  organizationAllList, // 获取部门
  selectPageWorkShopByState, // 获取车间
  listByWorkShop, // 获取车间下的班组
  // queryTeamOrUserList,
  postUserMesg,
  queryTeamByUser,
  getUsersByTeamList,
} from "@/api/service-module/jmsjd/common";
export default {
  name: "AdditionalTaskReportingDetails",
  components: {
    CompDetails,
    UncheckedDetails,
    UnderwayDetails,
    UndeterminedDetails,
  },
  directives: { permission },
  filters: {
    manHourFilter(row) {
      let val;
      if (!row.processTime || row.processTime == 0 || !row.actualTime || row.actualTime == 0) {
        val = row.distributionMol * Number(row.personnelQty);
      } else {
        val = (row.distributionMol / Number(row.actualTime)) * Number(row.personnelQty) * row.processTime;
      }
      val = val.toFixed(4);
      return val;
    },
  },
  data() {
    return {
      siteInfo: JSON.parse(sessionStorage.getItem("siteInfo")),
      activeName: "1",
      saveLoading: false,
      buttonAffairs: [
        {
          name: "报工确认", // 按钮名称
          icon: "el-icon-position", // 按钮图标
          type: "success", // 按钮颜色
          affairs: "Report", // emit触发按钮事件 @simAdd
          permission: ["additionalTaskReportingDetails_compale"],
        },
        {
          name: "工时修改", // 按钮名称
          icon: "el-icon-edit-outline", // 按钮图标
          type: "warning", // 按钮颜色
          affairs: "Edit", // emit触发按钮事件 @simAdd
          permission: ["additionalTaskReportingDetails_timeEdit"],
        },
        {
          name: "取消报工", // 按钮名称
          icon: "el-icon-refresh-left", // 按钮图标
          type: "danger", // 按钮颜色
          affairs: "CancelReport", // emit触发按钮事件 @simAdd
          permission: ["additionalTaskReportingDetails_cancelReport"],
        },
        {
          name: "取消确认", // 按钮名称
          icon: "el-icon-refresh-left", // 按钮图标
          type: "danger", // 按钮颜色
          affairs: "CancelConfirm", // emit触发按钮事件 @simAdd
          permission: ["additionalTaskReportingDetails_cancelConfirm"],
        },
      ],
      listQuery: {
        page: { current: 1, size: 10 },
        reportStatusList: [],
      },
      searchProps: [
        // 查询条件
        {
          label: "派工单号",
          prop: "personnelNumber",
          type: "input",
        },
        {
          label: "工作号",
          prop: "jobNumberLists",
          readonly: false,
          type: "inputAppend",
        },
        {
          label: "任务类型",
          prop: "orderType",
          type: "select",
          options: [],
        },
        {
          label: "发出部门",
          prop: "issueCode",
          type: "select",
          options: [],
        },
        {
          label: "任务名称",
          prop: "orderName",
          type: "input",
        },
        {
          label: "图号",
          prop: "mapNumberLists",
          readonly: false,
          type: "inputAppend",
        },
        {
          label: "完工日期",
          prop: "startCompletTime",
          prop2: "endCompletTime",
          type: "daterange",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
          defaultTime: ["00:00:00", "23:59:59"],
          rangeText: "-",
        },
        {
          label: "派工时间",
          prop: "startCreateTime",
          prop2: "endCreateTime",
          type: "daterange",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd",
          rangeText: "-",
        },
        {
          label: "项号",
          prop: "projectNumberLists",
          readonly: false,
          type: "inputAppend",
        },
        {
          label: "打印状态",
          prop: "printStatus",
          type: "select",
          options: [
            {
              value: "0",
              label: "未打印",
            },
            {
              value: "1",
              label: "已打印",
            },
          ],
        },
        {
          label: "报工状态",
          prop: "reportStatusList",
          type: "select",
          multiple: true,
          options: [],
        },
        {
          label: "设备",
          prop: "equUser",
          type: "lov",
          lovConfig: {
            code: "device_code", // lovCode
            showText: "equName", // 显示字段
            version: "MES1.0", // 版本号
            backDataProp: "DEVICE", // 选中表格数据返回要绑定的字段值 Mes2.0 === prop, Mes1.0 是带下划线的prop大写值
            backDataText: "DEVICE_NAME", // 选中表格数据返回要绑定的显示字段值 Mes2.0 === showText, Mes1.0 是带下划线的showText大写值
          },
        },
        {
          label: "报工人员",
          prop: "createUser",
          type: "lov",
          lovConfig: {
            readonly: true,
            code: "user_code", // lovCode
            text: "createName", // 显示字段
            version: "V1", // 版本号
            bindProp: { key: "USER_NAME", value: "REAL_NAME" },
          },
        },
      ],
      tableProps: [
        // 列表字段属性
        {
          label: "状态",
          prop: "reportStatus",
          minWidth: "80px",
          type: "selectText",
          overflow: true,
          options: [],
        },
        {
          label: "人员工号",
          prop: "perCode",
          minWidth: "80px",
          overflow: true,
        },
        {
          label: "人员名称",
          prop: "perName",
          minWidth: "80px",
          overflow: true,
        },
        {
          label: "报工数量",
          prop: "reportQty",
          minWidth: "90px",
          overflow: true,
        },
        {
          label: "工艺工时",
          prop: "processTime",
          minWidth: "80px",
          overflow: true,
        },
        {
          label: "参考工时",
          prop: "actualTime",
          minWidth: "80px",
          overflow: true,
        },
        {
          label: "工时分配",
          prop: "distributionMol",
          minWidth: "80px",
          overflow: true,
        },
        {
          label: "工时",
          prop: "laborHour",
          minWidth: "80px",
          overflow: true,
        },
        {
          label: "派工单号",
          prop: "personnelNumber",
          minWidth: "140px",
          overflow: true,
        },
        {
          label: "子任务单号",
          prop: "teamNumber",
          minWidth: "120px",
          overflow: true,
        },
        {
          label: "任务类型",
          prop: "orderType",
          minWidth: "150px",
          type: "selectText",
          overflow: true,
          options: [],
        },
        {
          label: "任务名称",
          prop: "orderName",
          minWidth: "300px",
          align: "left",
          overflow: true,
        },
        // { label: '打印状态', prop: 'printStatus', minWidth: '80px', type: 'selectText', overflow: true,
        //   options: [
        //     { value: '0', label: '未打印' },
        //     { value: '1', label: '已打印' }
        //   ]
        // },
        {
          label: "车间",
          prop: "workShopDesc",
          minWidth: "110px",
          overflow: true,
        },
        {
          label: "班组",
          prop: "teamDesc",
          minWidth: "150px",
          align: "left",
          overflow: true,
        },
        {
          label: "班组备注",
          prop: "teamDetailed",
          minWidth: "200px",
          align: "left",
          overflow: true,
        },
        {
          label: "项号",
          prop: "projectNumber",
          minWidth: "90px",
          overflow: true,
        },
        {
          label: "工作号",
          prop: "jobNumber",
          minWidth: "90px",
          overflow: true,
        },
        {
          label: "图号",
          prop: "mapNumber",
          minWidth: "120px",
          overflow: true,
        },
        // { label: '派工剩余数量', prop: 'residueQty', minWidth: '140px', overflow: true },
        {
          label: "完工日期",
          prop: "completTime",
          minWidth: "130px",
          overflow: true,
        },
        {
          label: "设备编码",
          prop: "equUser",
          minWidth: "120px",
          overflow: true,
        },
        {
          label: "设备名称",
          prop: "equName",
          minWidth: "120px",
          overflow: true,
        },
        // {
        //   label: '详细说明',
        //   prop: 'detailed',
        //   minWidth: '140px',
        //   overflow: true
        // },
        {
          label: "发出部门",
          prop: "issueName",
          minWidth: "110px",
          overflow: true,
        },
        {
          label: "报工人",
          prop: "createUser",
          minWidth: "90px",
          overflow: true,
        },
        {
          label: "报工时间",
          prop: "createTime",
          minWidth: "130px",
          overflow: true,
        },
        {
          label: "修改人",
          prop: "updateUser",
          minWidth: "100px",
          overflow: true,
        },
        {
          label: "修改时间",
          prop: "updateTime",
          minWidth: "130px",
          overflow: true,
        },
      ],
      tableConfig: {
        // 表格配置
        heihgt: "350",
        highlightCurrentRow: true, // 选择行颜色
        loading: false,
        handle: true, // 操作列默认不显示 false
        border: true, // 表格边框
        handleWidth: "80px", // 操作列宽
        fixed: "right", // 固定位置
        // buttonType: "scope",
        buttonAffairs: [
          // 操作列按钮事件
          {
            name: "查看", // 按钮名称
            type: "primary", // 颜色
            affairs: "Check", // emit触发事件 @simEdit="handleEdit" 返回 列表行数据row, 索引index
            permission: ["additionalTaskReportingDetails_check"],
          },
        ],
      },
      tableData: [],
      tableDataTotal: 0, //   大于0分页显示
      selectedData: [],
      selectData2: [],
      pageLoading: false,
      reportDialogVisible: false, // 下发班组
      editDialogVisible: false, // 新增编辑
      butLoading: false, // 保存按钮
      cheackDialogVisible: false, // 查看
      enterDialogVisible: false, //
      addForm: {},
      rules: {
        issueCode: [{ required: true, message: "请选择发出部门", trigger: "change" }],
        orderType: [{ required: true, message: "请选择任务类型", trigger: "change" }],
        workShop: [{ required: true, message: "请选择接收车间", trigger: "change" }],
        orderName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        actualTime: [{ required: true, message: "请输入参考工时", trigger: "blur" }],
      },
      reportTableData: [],
      issueSelectionList: [],
      groupOptionsList: [],
      departmentLists: [],
      orderTypeOptList: [],
      orderStatusOptList: [],
      workShopOptList: [],
      type: "add",
      checkRowList: {
        orderNumber: "",
      },
      fileList: [],
      enentType: "",
      textareaList: {
        jobNumber: "",
        mapNumber: "",
        projectNumber: "",
      },
      simForm: {},
      textareaValue: "",
      leftFormData: {
        workShop: "",
        teamList: [],
        perNameList: [],
        perCodeList: [],
      },
      userOptionsList: [],
      tableRowLists: {},
      workshopList: {},
      teamList: {},
      orderStatusAllList: [],
      httpUrl: process.env.VUE_APP_FILE_SERVER,
      iapSysRoleTDtoList: [],
      roleList: [
        "DG001",
        "DX001",
        "PB001",
        "XX001",
        "HD001",
        "CJ001",
        "CKBZ-DG",
        "CKBZ-DX",
        "CKBZ-PB",
        "CKBZ-XX",
        "CKBZ-HD",
        "CKBZ-CJ",
        "BZSCZ",
        "DG003",
        "DX003",
        "PB003",
        "XX003",
        "HD003",
        "CJ003",
      ],
      hideLeft: true,
    };
  },
  computed: {
    filterButtonAffairs() {
      if (this.activeName === "1") {
        return this.buttonAffairs.filter((item) => item.affairs !== "CancelConfirm");
      } else if (this.activeName === "2") {
        return this.buttonAffairs.filter((item) => item.affairs === "CancelConfirm");
      } else {
        return [];
      }
    },
  },
  created() {
    // 获取部门
    organizationAllList({
      type: 5,
      page: {
        size: 1000,
      },
    }).then((res) => {
      console.log(res);
      if (res.code == "200") {
        this.departmentLists = res.data.records.map((items) => {
          return {
            value: items.code,
            label: items.name,
            id: items.id,
          };
        });
        this.searchProps.map((item) => {
          if (item.prop == "issueCode") {
            item.options = this.departmentLists;
          }
        });
      }
    });
    // 数据字典 --- 任务类型
    this.getDictionary("append_quest_type", "orderType");
    // 数据字典 --- 非产品类的任务类型
    this.getDictionary("append_quest_no_type", "orderType");
    // 数据字典 --- 状态列表
    this.getDictionary("append_quest_status", "reportStatusList");
    // 数据字典 --- 状态
    this.getDictionary("append_quest_status", "reportStatus");
    this.getDictionary("append_quest_status", "orderStatusAllList");
  },
  mounted() {
    this.selectPageWorkShopByState();
    // this.loadTable(this.listQuery)
    this.postUserMesg();
  },
  methods: {
    // 获取数据字典
    getDictionary(key, prop) {
      getDictionary(key).then((data) => {
        console.log(data);
        if (data) {
          this.searchProps.map((item) => {
            if (item.prop == prop) {
              item.options = [...item.options, ...data];
            }
          });
          this.tableProps.map((item) => {
            if (item.prop == prop) {
              item.options = [...item.options, ...data];
            }
          });
          if (prop == "orderType") {
            this.orderTypeOptList = [...this.orderTypeOptList, ...data];
          } else if (prop == "reportStatus") {
            this.orderStatusOptList = data;
            console.log(1111, data);
          } else if (prop == "orderStatusAllList") {
            this.orderStatusAllList = data;
          }
        }
      });
    },
    // 根据用户查询用户信息
    postUserMesg() {
      const jsons = {
        userName: this.siteInfo.usr,
      };
      postUserMesg(jsons).then((res) => {
        console.log(res);
        if (res.code == "200") {
          this.leftFormData.workShop = this.$route.query.workShop
            ? this.$route.query.workShop
            : res.data.organizationCode;
          this.iapSysRoleTDtoList = res.data.iapSysRoleTDtoList;
          if (!this.iapSysRoleTDtoList.some((item) => this.roleList.includes(item.roleCode))) {
            this.searchProps.forEach((item) => {
              if (item.prop === "createUser") {
                item.disabled = true;
              }
            });
            this.listQuery.createUser = res.data.userName;
            this.listQuery.createName = res.data.realName;
            this.hideLeft = false;
          }
          // this.listByWorkShop(this.leftFormData.workShop)
          // this.loadTable(this.listQuery)
          this.queryTeamByUser(this.leftFormData.workShop);
        }
      });
    },
    // 根据用户查询班组信息
    async queryTeamByUser(workShop) {
      const jsons = {
        site: this.siteInfo.currentSite,
        user: this.siteInfo.usr,
      };
      const res = await queryTeamByUser(jsons);
      const teamList = [];
      if (res.code == "200") {
        if (res.data.length > 0) {
          res.data.forEach((item) => {
            teamList.push(item.team);
          });
        }
      }
      const jsons1 = {
        workShopCode: workShop,
        site: this.siteInfo.currentSite,
      };
      listByWorkShop(jsons1).then((res) => {
        console.log(res);
        if (res.code == "200") {
          this.groupOptionsList = res.data.map((item) => {
            return {
              value: item.productLine,
              label: item.productLineDesc,
              bo: item.bo,
            };
          });
          this.leftFormData.teamList = this.groupOptionsList
            .filter((item) => teamList.some((item1) => item1 === item.value))
            .map((item) => item.value);
          if (this.leftFormData.teamList.length) {
            this.queryTeamOrUserList(this.leftFormData.teamList);
          }
          this.loadTable(this.listQuery);
        }
      });
    },
    // 查询车间
    selectPageWorkShopByState() {
      const jsons = {
        limit: 1000,
        page: 1,
      };
      selectPageWorkShopByState(jsons).then((res) => {
        console.log(res);
        if (res.code == "200") {
          this.workShopOptList = res.data.records.map((items) => {
            return {
              value: items.WORK_SHOP,
              label: items.WORK_SHOP_DESC,
              name: items.WORK_SHOP_DESC,
              id: items.BO,
            };
          });
          this.searchProps.map((item) => {
            if (item.prop == "workShopList") {
              item.options = this.workShopOptList;
            }
          });
          // this.tableProps.
        }
      });
    },
    // 选择数据改变
    selectionChangeList(data) {
      this.selectedData = data;
    },
    // 查询列表
    loadTable(data) {
      const jsons = {
        ...data,
        workShopList: this.leftFormData.workShop ? [this.leftFormData.workShop] : [],
        teamList: this.leftFormData.teamList,
        perCodeList: data.createUser
          ? [data.createUser, ...this.leftFormData.perCodeList]
          : this.leftFormData.perCodeList,
        //   ...this.leftFormData
      };
      if (!jsons.reportStatusList) {
        jsons.reportStatusList = [];
      }
      if (jsons.jobNumberLists) {
        jsons.jobNumberList = jsons.jobNumberLists.split(",");
      } else {
        jsons.jobNumberList = [];
      }
      if (jsons.mapNumberLists) {
        jsons.mapNumberList = jsons.mapNumberLists.split(",");
      } else {
        jsons.mapNumberList = [];
      }
      if (jsons.projectNumberLists) {
        jsons.projectNumberList = jsons.projectNumberLists.split(",");
      } else {
        jsons.projectNumberList = [];
      }
      this.listQuery = jsons;
      this.$refs.undeterminedRef.loadTable(jsons);
      this.$refs.uncheckedRef.loadTable(jsons);
      this.$refs.underwayRef.loadTable(jsons);
      this.$refs.compRef.loadTable(jsons);
    },
    // 根据车间查询班组
    listByWorkShop(workshop) {
      const jsons = {
        workShopCode: workshop,
        site: this.siteInfo.currentSite,
      };
      listByWorkShop(jsons).then((res) => {
        console.log(res);
        if (res.code == "200") {
          this.groupOptionsList = res.data.map((item) => {
            return {
              value: item.productLine,
              label: item.productLineDesc,
              bo: item.bo,
            };
          });
        }
      });
    },
    // 切换标签页，刷新数据
    tabsChange() {
      this.loadTable(this.listQuery);
      this.selectData1 = [];
      this.selectData2 = [];
      this.selectedData = [];
    },
    // 查看
    handleCheck(row) {
      // this.$message.warning('待完善')
      this.checkRowList = row;
      this.listJdShopAdditionalTask(row);
      this.queryByIdTeam(row);
      this.queryByPageLists(row);
      this.$nextTick(() => {
        this.cheackDialogVisible = true;
      });
    },
    // 多选框选择
    selectChange(val, prop) {
      console.log(val, prop);
      if (prop == "workShop") {
        const list = this.workShopOptList.filter((item) => item.value == val)[0];
        this.addForm.workShopDesc = list.label;
      } else if (prop == "workShop" && !val) {
        this.addForm.workShopDesc = "";
      }

      if (prop == "issueCode") {
        const list = this.departmentLists.filter((item) => item.value == val)[0];
        console.log(list);
        this.addForm.issueName = list.label;
      } else if (prop == "issueCode" && !val) {
        this.addForm.issueName = "";
      }
    },
    // 文本框自定义
    handleAppendClick(form, prop, value) {
      if (prop == "projectNumberLists") {
        this.enentType = prop;
        this.simForm = form;
        this.enterDialogVisible = true;
      }
      if (prop == "mapNumberLists") {
        this.enentType = prop;
        this.simForm = form;
        this.enterDialogVisible = true;
      }
      if (prop == "jobNumberLists") {
        this.enentType = prop;
        this.simForm = form;
        this.enterDialogVisible = true;
      }
    },
    // 确认文本
    enterDialogSave() {
      if (this.textareaValue) {
        this.simForm[this.enentType] = this.textareaValue
          .replaceAll("\n", ",")
          .replaceAll(" ", ",")
          .replaceAll("，", ",")
          .replaceAll(",,,", ",")
          .replaceAll(",,", ",");
        this.simForm[this.enentType] = this.simForm[this.enentType]
          .split(",")
          .filter((item) => item)
          .join(",");
      } else {
        this.simForm[this.enentType] = "";
      }
      this.enterDialogVisible = false;
    },
    //   ----
    // 选择车间
    workShopSelectChange(val, prop) {
      if (val) {
        this.groupOptionsList = [];
        this.userOptionsList = [];
        this.leftFormData.teamList = [];
        this.leftFormData.perNameList = [];
        this.leftFormData.perCodeList = [];
        this.listByWorkShop(val);
      } else {
        this.groupOptionsList = [];
        this.userOptionsList = [];
        this.leftFormData.perNameList = [];
        this.leftFormData.perCodeList = [];
      }
    },
    // 选择班组
    teamSelectChange(val, prop) {
      if (val) {
        this.leftFormData.perNameList = [];
        this.leftFormData.perCodeList = [];
        this.queryTeamOrUserList(val);
      } else {
        this.userOptionsList = [];
        this.leftFormData.perNameList = [];
        this.leftFormData.perCodeList = [];
      }
    },
    // 根据班组查人员
    queryTeamOrUserList(teamList) {
      const jsons = {
        page: {
          size: 1000,
          current: 1,
        },
        teamBoList: this.groupOptionsList
          .filter((item) => teamList.some((item1) => item1 === item.value))
          .map((item) => item.bo),
      };
      getUsersByTeamList(jsons).then((res) => {
        console.log(res);
        if (res.code == "200") {
          this.userOptionsList = res.data.records.map((item) => {
            return {
              key: item.userName,
              value: item.userName,
              label: item.realName,
              name: item.realName,
            };
          });
        }
      });
    },
    // 复选框选择
    checkboxChange(data) {
      console.log(data);
      this.leftFormData.perCodeList = data.map((item) => {
        const list = this.userOptionsList.filter((items) => items.label == item)[0];
        return list.key;
      });
    },
    // 按钮合集
    handleBtnClick(affairs) {
      this["handleBtn" + affairs]();
    },
    // 报工弹窗
    handleBtnReport() {
      if (!this.selectedData.length) {
        this.$message.warning("请选择数据!");
        return false;
      }
      if (this.selectedData.some((item) => !["3", "9"].includes(item.reportStatus))) {
        this.$message.warning("状态为待确认和车间未通过状态才能报工确认！");
        return false;
      }
      this.$confirm("是否对报工信息进行确认?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const jsons = this.selectedData.map((item) => {
            return {
              id: item.id,
              distributionDen: item.distributionDen,
              distributionMol: item.distributionMol,
              equUser: item.equUser,
              equName: item.equName,
              perCode: item.perCode,
              perName: item.perName,
              personnelId: item.personnelId,
              reportQty: item.reportQty,
              reportStatus: "6",
              shopId: item.shopId,
              teamId: item.teamId,
              site: item.site,
            };
          });
          this.saveLoading = true;
          postTaskReportEdit(jsons)
            .then((res) => {
              console.log(res);
              this.saveLoading = false;
              if (res.code == "200") {
                this.$message.success("确认报工成功！");
                this.reportDialogVisible = false;
                this.loadTable(this.listQuery);
              }
            })
            .catch((error) => {
              console.log(error);
              this.saveLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
      // this.queryByPageLists(this.selectedData[0], this.selectedData.map(item => item.personnelNumber))
      // this.reportDialogVisible = true
    },
    // 根据ID查人员数据
    queryByPageLists(row) {
      const jsons = {
        personnelId: row.personnelId,
        page: {
          current: 1,
          size: 9999,
        },
      };
      queryByPage(jsons).then((res) => {
        console.log(res);
        if (res.code == "200") {
          this.reportTableData = res.data.records.map((item) => {
            // 转换分配比例为小数
            const num = (1 / Number(item.distributionDen)) * Number(item.distributionMol);
            return {
              ...row,
              ...item,
              laborHour: Number(row.processTime) * Number(row.remReportQty) * Number(num),
              personnelNumber: row.personnelNumber,
              Mol_Den: `${item.distributionMol}/${item.distributionDen}`,
            };
          });
          console.log(this.reportTableData);
        }
      });
    },
    // 工时修改弹窗
    handleBtnEdit() {
      // this.$refs.dialog.open('编辑', row)
      if (this.selectedData.length != 1) {
        this.$message.warning("请选择一条数据!");
        return false;
      }
      if (this.selectedData[0].reportStatus != "3" && this.selectedData[0].reportStatus != "9") {
        this.$message.error("状态为待确认和车间未通过的数据才能编辑工时!");
        return false;
      }
      this.tableRowLists = this.selectedData[0];
      this.addForm = {
        ...this.selectedData[0],
      };
      this.queryByPageLists(this.selectedData[0]);
      this.editDialogVisible = true;
    },
    // 修改工时
    editTableSave() {
      let num, title;
      if (this.addForm.processTime != 0) {
        num = this.addForm.processTime;
        title = "工艺工时";
      } else {
        if (this.addForm.actualTime == 0) {
          this.$message.warning("参考工时不能为空");
          return;
        }
        title = "参考工时";
        num = this.addForm.actualTime;
      }
      // 分配工时只和
      const distributionMol = this.reportTableData.reduce((prop, item) => {
        prop += Number(item.distributionMol);
        return prop;
      }, 0);
      if (distributionMol != num) {
        this.$message.warning(`分配工时之和必须等于${title}`);
        return;
      }
      this.saveLoading = false;
      const userList = this.reportTableData.map((item) => {
        return {
          id: item.id,
          distributionDen: item.distributionDen,
          distributionMol: item.distributionMol,
          perCode: item.perCode,
          perName: item.perName,
          personnelId: item.personnelId,
          site: item.site,
        };
      });
      const jsonsTeam = {
        id: this.addForm.teamId,
        actualTime: this.addForm.actualTime,
      };
      editJdAdditionalTaskReport(userList)
        .then((res) => {
          console.log(res);
          this.saveLoading = false;
          if (res.code == "200") {
            this.$message.success("修改成功!");
            this.loadTable(this.listQuery);
            this.editDialogVisible = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.saveLoading = false;
        });
      editTeamAdditionalTask(jsonsTeam).then((res) => {
        console.log(res);
        if (res.code == "200") {
          console.log("班组参考工时修改成功");
        }
      });
    },

    // -----查看---
    // 查询车间基本信息
    listJdShopAdditionalTask(row) {
      const jsons = {
        id: row.shopId,
      };
      listJdShopAdditionalTask(jsons).then((res) => {
        console.log(res);
        if (res.code == "200") {
          if (res.data.length > 0) {
            this.workshopList = res.data[0];
          } else {
            this.workshopList = {};
          }
        }
      });
    },
    // 查询班组附加任务信息
    queryByIdTeam(row) {
      const jsons = {
        id: row.teamId,
      };
      queryByIdTeam(jsons).then((res) => {
        console.log(res);
        if (res.code == "200") {
          if (res.data) {
            this.teamList = res.data;
          } else {
            this.teamList = {};
          }
        }
      });
    },
    // 修改参考工时
    handleChangeActualTime(val) {
      this.reportTableData.forEach((item) => {
        item.distributionDen = val;
        item.distributionMol = (val / this.reportTableData.length).toFixed(4);
      });
    },
    // 确认报工
    reportClickBtn() {},
    // 取消报工
    handleBtnCancelReport() {
      if (!this.selectedData.length) {
        this.$message.warning("请先选择数据!");
        return false;
      }
      if (this.selectedData.some((item) => item.reportStatus != "3")) {
        this.$message.warning("只能对状态为待确认的数据进行取消报工，请检查！");
        return;
      }
      this.$confirm("此操作将对选择的数据进行取消报工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const jsons = this.selectedData.map((item) => item.personnelId);
          this.tableConfig.loading = true;
          const res = await cancelReportByPersonnelIds(jsons);
          this.tableConfig.loading = false;
          if (res.code === "200") {
            this.$message.success("取消报工成功！");
            this.loadTable(this.listQuery);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消确认
    handleBtnCancelConfirm() {
      if (!this.selectedData.length) {
        this.$message.warning("请先选择数据!");
        return false;
      }
      if (this.selectedData.some((item) => item.reportStatus != "6")) {
        this.$message.warning("只能对状态为车间未审核的数据进行取消确认，请检查！");
        return;
      }
      this.$confirm("此操作将对选择的数据进行取消确认, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const jsons = this.selectedData.map((item) => item.id);
          this.tableConfig.loading = true;
          const res = await cancelConfirmById(jsons);
          this.tableConfig.loading = false;
          if (res.code === "200") {
            this.$message.success("取消确认成功！");
            this.loadTable(this.listQuery);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 导出
    handleExportFiles() {
      let reportStatusListLocal = [];
      switch (this.activeName) {
        case "1":
          // 待确认
          reportStatusListLocal = this.$refs.undeterminedRef.reportStatusListCopy;
          break;
        case "2":
          // 车间审核
          reportStatusListLocal = this.$refs.uncheckedRef.reportStatusListCopy;
          break;
        case "3":
          // 进行中
          reportStatusListLocal = this.$refs.underwayRef.reportStatusListCopy;
          break;
        case "4":
          // 完成
          reportStatusListLocal = this.$refs.compRef.reportStatusListCopy;
          break;
        default:
          reportStatusListLocal = this.$refs.undeterminedRef.reportStatusListCopy;
          break;
      }
      this.pageLoading = true;
      const jsons = {
        ...this.listQuery,
        workShopList: this.leftFormData.workShop ? [this.leftFormData.workShop] : [],
        teamList: this.leftFormData.teamList,
        reportStatusList: reportStatusListLocal,
        perCodeList: this.listQuery.createUser
          ? [this.listQuery.createUser, ...this.leftFormData.perCodeList]
          : this.leftFormData.perCodeList,
      };
      if (!jsons.reportStatusList) {
        jsons.reportStatusList = [];
      }
      if (jsons.jobNumberLists) {
        jsons.jobNumberList = jsons.jobNumberLists.split(",");
      } else {
        jsons.jobNumberList = [];
      }
      if (jsons.mapNumberLists) {
        jsons.mapNumberList = jsons.mapNumberLists.split(",");
      } else {
        jsons.mapNumberList = [];
      }
      if (jsons.projectNumberLists) {
        jsons.projectNumberList = jsons.projectNumberLists.split(",");
      } else {
        jsons.projectNumberList = [];
      }
      jdTeamAdditionalTaskPersonnelExport(jsons)
        .then((res) => {
          const reader = new FileReader(); // 创建一个可读原始数据
          reader.readAsDataURL(res); // 将数据流存入并转换成url
          reader.onload = (e) => {
            const a = document.createElement("a");
            a.href = e.target.result;
            a.download = "附加任务报工明细" + formatDate(new Date(), "yyyyMMddHHmmss") + ".xlsx"; // 文件名字
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.$message.success("导出成功");
            this.pageLoading = false;
          };
        })
        .catch(() => {
          this.pageLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-aside {
  padding: 10px 10px;
  background: #fff;
  border: 1px solid #efe7e7;
}

/deep/ .editClass .el-form-item--mini.el-form-item {
  margin-bottom: 10px;
}
</style>
