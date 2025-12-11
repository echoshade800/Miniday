import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  
  /**
   * 自定义日期 + 时间滚轮组件
   * - 模仿 iOS 原生 Date+Time Picker 样式
   * - 年 / 月 / 日 / 时 / 分 5 列
   * - 使用无限滚动 + snap，对齐稳定，不抖动
   */
  export default function DateTimePickerScroll({
    initialDate = new Date(),
    minYear,
    maxYear,
    itemHeight = 44,
    pickerHeight = 260,
    onChange, // (date: Date) => void
  }) {
    const ITEM_HEIGHT = itemHeight;
    const PICKER_HEIGHT = pickerHeight;
    const PICKER_PADDING = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;
    const REPEAT_COUNT = 12;
  
    const now = useMemo(() => new Date(), []);
    const resolvedMinYear = minYear ?? now.getFullYear() - 10;
    const resolvedMaxYear = maxYear ?? now.getFullYear() + 30;
  
    // ----- 基础数组 -----
    const MONTHS_BASE = useMemo(
      () =>
        Array.from({ length: 12 }, (_, i) => ({
          value: i, // 0-11
          label: monthLabel(i),
        })),
      [],
    );
  
    const DAYS_BASE = useMemo(
      () =>
        Array.from({ length: 31 }, (_, i) => ({
          value: i + 1, // 1-31
          label: String(i + 1),
        })),
      [],
    );
  
    const YEARS_BASE = useMemo(
      () =>
        Array.from(
          { length: resolvedMaxYear - resolvedMinYear + 1 },
          (_, i) => {
            const year = resolvedMinYear + i;
            return { value: year, label: String(year) };
          },
        ),
      [resolvedMinYear, resolvedMaxYear],
    );
  
    const HOURS_BASE = useMemo(
      () =>
        Array.from({ length: 24 }, (_, i) => ({
          value: i,
          label: String(i).padStart(2, '0'),
        })),
      [],
    );
  
    const MINUTES_BASE = useMemo(
      () =>
        Array.from({ length: 60 }, (_, i) => ({
          value: i,
          label: String(i).padStart(2, '0'),
        })),
      [],
    );
  
    // ----- 无限滚动数组 -----
    const monthsArray = useMemo(
      () =>
        repeatArray(REPEAT_COUNT, MONTHS_BASE, 'month'),
      [MONTHS_BASE],
    );
    const daysArray = useMemo(
      () =>
        repeatArray(REPEAT_COUNT, DAYS_BASE, 'day'),
      [DAYS_BASE],
    );
    const yearsArray = useMemo(
      () =>
        repeatArray(REPEAT_COUNT, YEARS_BASE, 'year'),
      [YEARS_BASE],
    );
    const hoursArray = useMemo(
      () =>
        repeatArray(REPEAT_COUNT, HOURS_BASE, 'hour'),
      [HOURS_BASE],
    );
    const minutesArray = useMemo(
      () =>
        repeatArray(REPEAT_COUNT, MINUTES_BASE, 'minute'),
      [MINUTES_BASE],
    );
  
    // ----- 选中值 -----
    const [selectedYear, setSelectedYear] = useState(() =>
      clampYear(initialDate.getFullYear(), resolvedMinYear, resolvedMaxYear),
    );
    const [selectedMonth, setSelectedMonth] = useState(() =>
      clampRange(initialDate.getMonth(), 0, 11),
    );
    const [selectedDay, setSelectedDay] = useState(() =>
      clampRange(initialDate.getDate(), 1, 31),
    );
    const [selectedHour, setSelectedHour] = useState(() =>
      clampRange(initialDate.getHours(), 0, 23),
    );
    const [selectedMinute, setSelectedMinute] = useState(() =>
      clampRange(initialDate.getMinutes(), 0, 59),
    );
  
    // ScrollView ref
    const monthRef = useRef(null);
    const dayRef = useRef(null);
    const yearRef = useRef(null);
    const hourRef = useRef(null);
    const minuteRef = useRef(null);
    const hasInitialisedRef = useRef(false);
  
    // 通用对齐函数
    const alignToNearest = useCallback(
      (scrollRef, index) => {
        scrollRef.current?.scrollTo({
          y: index * ITEM_HEIGHT,
          animated: true,
        });
      },
      [ITEM_HEIGHT],
    );
  
    // 统一发出 Date 变更
    const emitChange = useCallback(
      (patch = {}) => {
        const year = patch.year ?? selectedYear;
        const month = patch.month ?? selectedMonth;
        const hour = patch.hour ?? selectedHour;
        const minute = patch.minute ?? selectedMinute;
        let day = patch.day ?? selectedDay;
  
        // 根据年月修正日期（例如 2 月 31 日 -> 2 月 28/29 日）
        const maxDay = daysInMonth(year, month);
        if (day > maxDay) {
          day = maxDay;
        }
  
        const next = new Date(year, month, day, hour, minute, 0, 0);
  
        if (typeof onChange === 'function') {
          onChange(next);
        }
      },
      [onChange, selectedYear, selectedMonth, selectedDay, selectedHour, selectedMinute],
    );
  
    // 各列滚动结束处理
    const handleMonthEnd = useCallback(
      (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const rawIndex = Math.round(offsetY / ITEM_HEIGHT);
        const baseLength = MONTHS_BASE.length;
        const idx = modulo(rawIndex, baseLength);
        const value = MONTHS_BASE[idx].value;
  
        setSelectedMonth(value);
        alignToNearest(monthRef, rawIndex);
        emitChange({ month: value });
      },
      [ITEM_HEIGHT, MONTHS_BASE, alignToNearest, emitChange],
    );
  
    const handleDayEnd = useCallback(
      (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const rawIndex = Math.round(offsetY / ITEM_HEIGHT);
        const baseLength = DAYS_BASE.length;
        const idx = modulo(rawIndex, baseLength);
        const value = DAYS_BASE[idx].value;
  
        setSelectedDay(value);
        alignToNearest(dayRef, rawIndex);
        emitChange({ day: value });
      },
      [ITEM_HEIGHT, DAYS_BASE, alignToNearest, emitChange],
    );
  
    const handleYearEnd = useCallback(
      (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const rawIndex = Math.round(offsetY / ITEM_HEIGHT);
        const baseLength = YEARS_BASE.length;
        const idx = modulo(rawIndex, baseLength);
        const value = YEARS_BASE[idx].value;
  
        setSelectedYear(value);
        alignToNearest(yearRef, rawIndex);
        emitChange({ year: value });
      },
      [ITEM_HEIGHT, YEARS_BASE, alignToNearest, emitChange],
    );
  
    const handleHourEnd = useCallback(
      (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const rawIndex = Math.round(offsetY / ITEM_HEIGHT);
        const baseLength = HOURS_BASE.length;
        const idx = modulo(rawIndex, baseLength);
        const value = HOURS_BASE[idx].value;
  
        setSelectedHour(value);
        alignToNearest(hourRef, rawIndex);
        emitChange({ hour: value });
      },
      [ITEM_HEIGHT, HOURS_BASE, alignToNearest, emitChange],
    );
  
    const handleMinuteEnd = useCallback(
      (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const rawIndex = Math.round(offsetY / ITEM_HEIGHT);
        const baseLength = MINUTES_BASE.length;
        const idx = modulo(rawIndex, baseLength);
        const value = MINUTES_BASE[idx].value;
  
        setSelectedMinute(value);
        alignToNearest(minuteRef, rawIndex);
        emitChange({ minute: value });
      },
      [ITEM_HEIGHT, MINUTES_BASE, alignToNearest, emitChange],
    );
  
    // 初始定位到中间某一组，避免一开始就在顶部/底部
    useEffect(() => {
      if (hasInitialisedRef.current) return;
      hasInitialisedRef.current = true;
  
      const centerGroup = Math.floor(REPEAT_COUNT / 2);
  
      const initialMonthIndex =
        centerGroup * MONTHS_BASE.length + clampRange(initialDate.getMonth(), 0, 11);
      const initialDayIndex =
        centerGroup * DAYS_BASE.length +
        clampRange(initialDate.getDate(), 1, 31) -
        1;
      const initialYearIndex =
        centerGroup * YEARS_BASE.length +
        clampRange(
          initialDate.getFullYear() - resolvedMinYear,
          0,
          YEARS_BASE.length - 1,
        );
      const initialHourIndex =
        centerGroup * HOURS_BASE.length +
        clampRange(initialDate.getHours(), 0, 23);
      const initialMinuteIndex =
        centerGroup * MINUTES_BASE.length +
        clampRange(initialDate.getMinutes(), 0, 59);
  
      monthRef.current?.scrollTo({
        y: initialMonthIndex * ITEM_HEIGHT,
        animated: false,
      });
      dayRef.current?.scrollTo({
        y: initialDayIndex * ITEM_HEIGHT,
        animated: false,
      });
      yearRef.current?.scrollTo({
        y: initialYearIndex * ITEM_HEIGHT,
        animated: false,
      });
      hourRef.current?.scrollTo({
        y: initialHourIndex * ITEM_HEIGHT,
        animated: false,
      });
      minuteRef.current?.scrollTo({
        y: initialMinuteIndex * ITEM_HEIGHT,
        animated: false,
      });
    }, [
      ITEM_HEIGHT,
      MONTHS_BASE.length,
      DAYS_BASE.length,
      YEARS_BASE.length,
      HOURS_BASE.length,
      MINUTES_BASE.length,
      initialDate,
      resolvedMinYear,
    ]);
  
    return (
      <View style={[styles.container, { height: PICKER_HEIGHT }]}>
        {/* Year */}
        <PickerColumn
          labelArray={yearsArray}
          selectedValue={selectedYear}
          onEnd={handleYearEnd}
          scrollRef={yearRef}
          PICKER_PADDING={PICKER_PADDING}
          ITEM_HEIGHT={ITEM_HEIGHT}
        />
        {/* Month */}
        <PickerColumn
          labelArray={monthsArray}
          selectedValue={selectedMonth}
          onEnd={handleMonthEnd}
          scrollRef={monthRef}
          PICKER_PADDING={PICKER_PADDING}
          ITEM_HEIGHT={ITEM_HEIGHT}
        />
        {/* Day */}
        <PickerColumn
          labelArray={daysArray}
          selectedValue={selectedDay}
          onEnd={handleDayEnd}
          scrollRef={dayRef}
          PICKER_PADDING={PICKER_PADDING}
          ITEM_HEIGHT={ITEM_HEIGHT}
        />
        {/* Hour */}
        <PickerColumn
          labelArray={hoursArray}
          selectedValue={selectedHour}
          onEnd={handleHourEnd}
          scrollRef={hourRef}
          PICKER_PADDING={PICKER_PADDING}
          ITEM_HEIGHT={ITEM_HEIGHT}
        />
        {/* Minute */}
        <PickerColumn
          labelArray={minutesArray}
          selectedValue={selectedMinute}
          onEnd={handleMinuteEnd}
          scrollRef={minuteRef}
          PICKER_PADDING={PICKER_PADDING}
          ITEM_HEIGHT={ITEM_HEIGHT}
        />
  
        {/* 选中高亮区域 */}
        <View
          pointerEvents="none"
          style={[
            styles.selectionOverlay,
            {
              top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
              height: ITEM_HEIGHT,
            },
          ]}
        >
          <View style={styles.selectionLine} />
          <View style={styles.selectionLine} />
        </View>
      </View>
    );
  }
  
  /**
   * 单列滚轮封装组件
   */
  function PickerColumn({
    labelArray,
    selectedValue,
    onEnd,
    scrollRef,
    PICKER_PADDING,
    ITEM_HEIGHT,
  }) {
    return (
      <View style={styles.column}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="normal"
          onMomentumScrollEnd={onEnd}
          nestedScrollEnabled
          scrollEnabled
          bounces={false}
          scrollEventThrottle={16}
          removeClippedSubviews={false}
        >
          <View style={{ height: PICKER_PADDING }} />
          {labelArray.map((item) => (
            <View
              key={item.key}
              style={[
                styles.item,
                { height: ITEM_HEIGHT },
                item.value === selectedValue && styles.itemSelected,
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  item.value === selectedValue && styles.itemTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </View>
          ))}
          <View style={{ height: PICKER_PADDING }} />
        </ScrollView>
      </View>
    );
  }
  
  /* --------------- 工具函数 --------------- */
  
  function modulo(index, baseLength) {
    return ((index % baseLength) + baseLength) % baseLength;
  }
  
  function clampRange(value, min, max) {
    if (!Number.isFinite(value)) return min;
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
  
  function clampYear(value, minYear, maxYear) {
    return clampRange(value, minYear, maxYear);
  }
  
  function monthLabel(idx) {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return labels[idx] ?? String(idx + 1);
  }
  
  function daysInMonth(year, monthIndex) {
    // monthIndex: 0-11
    return new Date(year, monthIndex + 1, 0).getDate();
  }
  
  function repeatArray(REPEAT_COUNT, baseArray, prefix) {
    return [...Array(REPEAT_COUNT)].flatMap((_, repeatIndex) =>
      baseArray.map((item, index) => ({
        key: `${prefix}-${repeatIndex}-${index}`,
        value: item.value,
        label: item.label,
      })),
    );
  }
  
  /* --------------- 样式 --------------- */
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'relative',
      backgroundColor: '#FFFFFF',
    },
    column: {
      flex: 1,
      alignItems: 'center',
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemSelected: {
      opacity: 1,
    },
    itemText: {
      fontSize: 18,
      color: '#999999',
    },
    itemTextSelected: {
      color: '#111111',
      fontWeight: '600',
    },
    selectionOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    selectionLine: {
      height: 1,
      backgroundColor: '#111111',
      opacity: 0.3,
    },
  });
  
  /**
   * 一个简单的 Modal 示例（可以选用）
   */
  export function DateTimePickerScrollModalExample() {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(new Date());
  
    const handleChange = useCallback((date) => {
      setValue(date);
    }, []);
  
    const formatDateTime = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mi = String(date.getMinutes()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
    };
  
    return (
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
          Target Date & Time
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            borderColor: '#000',
            borderRadius: 14,
            padding: 12,
          }}
          onPress={() => setVisible(true)}
        >
          <Text>{formatDateTime(value)}</Text>
        </TouchableOpacity>
  
        <Modal transparent animationType="slide" visible={visible}>
          <View style={exampleStyles.modalOverlay} pointerEvents="box-none">
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View style={exampleStyles.modalBackdrop} />
            </TouchableWithoutFeedback>
  
            <View
              style={exampleStyles.modalContentWrapper}
              pointerEvents="box-none"
            >
              <View style={exampleStyles.modalContent} pointerEvents="auto">
                <Text style={exampleStyles.modalTitle}>Select target date</Text>
                <DateTimePickerScroll
                  initialDate={value}
                  onChange={handleChange}
                />
                <View style={exampleStyles.actionsRow}>
                  <TouchableOpacity
                    style={[exampleStyles.actionButton, exampleStyles.cancelButton]}
                    onPress={() => setVisible(false)}
                  >
                    <Text style={exampleStyles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[exampleStyles.actionButton, exampleStyles.confirmButton]}
                    onPress={() => setVisible(false)}
                  >
                    <Text style={exampleStyles.confirmText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  
  const exampleStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalBackdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContentWrapper: {
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 12,
    },
    actionsRow: {
      flexDirection: 'row',
      marginTop: 12,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 999,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      borderColor: '#000',
      backgroundColor: '#FFFFFF',
    },
    confirmButton: {
      borderColor: '#000',
      backgroundColor: '#000',
    },
    cancelText: {
      color: '#000',
      fontWeight: '600',
    },
    confirmText: {
      color: '#FFF',
      fontWeight: '600',
    },
  });
  