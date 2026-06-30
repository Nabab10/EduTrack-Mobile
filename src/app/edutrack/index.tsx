import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated, Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Search Bar ────────────────────────────────────────────────────────────────
function SearchBar() {
  return (
    <View style={styles.searchRow}>
      <TouchableOpacity>
        <Ionicons name="flash" size={26} color="white" />
      </TouchableOpacity>
      <View style={styles.searchInput}>
        <Ionicons name="search" size={15} color="#9CA3AF" />
        <Text style={styles.searchPlaceholder}>Rechercher sur EduTrack</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>G</Text>
      </View>
    </View>
  );
}

// ─── Hero Banner ───────────────────────────────────────────────────────────────
function useFloatingAnim(duration: number, range: number) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopX = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: range,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -range,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const loopY = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -range * 0.7,
          duration: duration * 1.3,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: range * 0.7,
          duration: duration * 1.3,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    loopX.start();
    loopY.start();

    return () => {
      loopX.stop();
      loopY.stop();
    };
  }, [duration, range, translateX, translateY]);

  return { transform: [{ translateX }, { translateY }] };
}

function HeroBanner() {
  const float1 = useFloatingAnim(4000, 10);
  const float2 = useFloatingAnim(5000, 14);
  const float3 = useFloatingAnim(3500, 8);
  const float4 = useFloatingAnim(4500, 12);

  return (
    <View style={styles.hero}>
      {/* Background blobs */}
      <Animated.View style={[styles.blob, { width: 110, height: 110, backgroundColor: '#1a6b3c', top: -10, left: 30 }, float1]} />
      <Animated.View style={[styles.blob, { width: 130, height: 130, backgroundColor: '#c8a000', top: -20, right: -10 }, float2]} />
      <Animated.View style={[styles.blob, { width: 90,  height: 90,  backgroundColor: '#1a3a8c', bottom: -10, left: 160 }, float3]} />
      <Animated.View style={[styles.blob, { width: 80,  height: 80,  backgroundColor: '#b22222', bottom: 0,   left: 10  }, float4]} />

      {/* Header row */}
      <View style={styles.heroHeader}>
        <View style={styles.trophyBox}>
          <Ionicons name="school-outline" size={29} color="#4361EE" />
        </View>
        <Text style={styles.heroTitle}>Cursus 2026-2027</Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Ionicons name="notifications-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        {[...Array(7)].map((_, i) => (
          <View key={i} style={[styles.progressDot, i < 4 ? styles.dotActive : styles.dotDim]} />
        ))}
      </View>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>11 juin</Text>
        <Text style={styles.dateText}>19 juil.</Text>
      </View>
    </View>
  );
}
// ─── Countdown ─────────────────────────────────────────────────────────────────
function CountdownTimer() {
  const units = [
    { value: '07', unit: 'H' },
    { value: '10', unit: 'M' },
    { value: '25', unit: 'S' },
  ];
  return (
  <View style={styles.countdownContainer}>
    <View style={styles.partnerRow}>
      <Text style={styles.partnerText}>
        Sofascore Premium Partner
      </Text>

      <Text style={styles.partnerLogo}>
        1XBET
      </Text>
    </View>

    <View style={styles.timerRow}>
      {units.map(({ value, unit }) => (
        <View key={unit} style={styles.timerBox}>
          <Text style={styles.timerValue}>
            {value}
            <Text style={styles.timerUnit}>{unit}</Text>
          </Text>
        </View>
      ))}
    </View>
  </View>
);
}

// ─── Match Card ────────────────────────────────────────────────────────────────
interface MatchCardProps {
  group: string;
  homeFlag: string;
  homeCode: string;
  awayFlag: string;
  awayCode: string;
  time: string;
  odds: [string, string, string];
  venue: string;
  partial?: boolean;
}
function MatchCard({ group, homeFlag, homeCode, awayFlag, awayCode, time, odds, venue, partial }: MatchCardProps) {
  return (
    <View style={[styles.card, partial && styles.cardPartial]}>
      <Text style={styles.cardGroup}>{group}</Text>

      {/* Teams + time */}
      <View style={styles.teamRow}>
        <Text style={styles.flag}>{homeFlag}</Text>
        <Text style={styles.teamCode}>{homeCode}</Text>
        
      </View>
      <View style={[styles.teamRow, { marginTop: 6, marginBottom: 14 }]}>
        <Text style={styles.flag}>{awayFlag}</Text>
        <Text style={styles.teamCode}>{awayCode}</Text>
      </View>

      {/* Odds */}
      {!partial && (
        <View style={styles.oddsRow}>
          {odds.map((o, i) => (
            <View key={i} style={styles.oddPill}>
              <Text style={styles.oddText}>{o}</Text>
            </View>
          ))}
        </View>
      )}
      {partial && (
        <View style={styles.oddsRow}>
          <View style={styles.oddPill}>
            <Text style={styles.oddText}>{odds[0]}</Text>
          </View>
        </View>
      )}

      {/* Venue */}
      {!partial && (
        <View style={styles.venueRow}>
          <Ionicons name="location-outline" size={11} color="#9CA3AF" />
          <Text style={styles.venueText}>{venue}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Matches Section ───────────────────────────────────────────────────────────
function MatchesSection() {
  return (
    <View style={{ marginBottom: 4 }}>
      {/* Labels row above the scroll */}
      <View style={styles.matchLabels}>
        <Text style={styles.matchLabelText}>Collèges</Text>
        <Text style={[styles.matchLabelText, { marginLeft: 148 + 12 }]}>Ecoles</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 4 }}
      >
        <MatchCard
          group="Ecole 1"
          homeFlag="🇲🇽" homeCode="MEMP"
          awayFlag="🇿🇦" awayCode="EPP CALAVI"
          time="20:00"
          odds={['1,40', '4,50', '8,50']}
          venue="Mexico City"
        />
        <MatchCard
          group="Groupe A"
          homeFlag="🇰🇷" homeCode="KOR"
          awayFlag="🇨🇿" awayCode="CZE"
          time="03:00"
          odds={['2,63', '3,10', '2,88']}
          venue="Guadalajara"
        />
        <MatchCard
          group="Groupe A"
          homeFlag="🇰🇷" homeCode="KOR"
          awayFlag="🇨🇿" awayCode="CZE"
          time="03:00"
          odds={['2,63', '3,10', '2,88']}
          venue="Guadalajara"
        />
        {/* Partial third card */}
        
      </ScrollView>
    </View>
  );
}

// ─── Planning Button ───────────────────────────────────────────────────────────
function PlanningButton() {
  return (
    <View style={styles.planningWrap}>
      <TouchableOpacity activeOpacity={0.75} style={styles.planningBtn}>
        <Text style={styles.planningText}>Consuler Resultats</Text>
        <Ionicons name="chevron-forward" size={18} color="#4361EE" />
      </TouchableOpacity>
    </View>
  );
}

// ─── Result Divider ────────────────────────────────────────────────────────────
function ResultDivider() {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>Résultat du match</Text>
      <View style={styles.betBadgeLg}>
        <Text style={styles.betTextLg}>1XBET</Text>
      </View>
    </View>
  );
}

// ─── Standings ─────────────────────────────────────────────────────────────────
function Standings() {
  const groups = ['Groupe A', 'Groupe B', 'Groupe C', 'Groupe D', 'Groupe E'];
  return (
    <View style={{ marginTop: 8 }}>
      <View style={styles.standingsHeader}>
        <Text style={styles.standingsTitle}>Classements</Text>
        <TouchableOpacity style={styles.vueRow}>
          <Text style={styles.vueText}>Vue complète</Text>
          <Ionicons name="chevron-forward" size={16} color="#4361EE" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      >
        {groups.map((g, i) => (
          <TouchableOpacity key={g} style={[styles.groupTab, i === 0 && styles.groupTabActive]}>
            <Text style={[styles.groupTabText, i === 0 && styles.groupTabTextActive]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}



// ─── Root Screen ───────────────────────────────────────────────────────────────
export default function WorldCupScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />

      {/* Dark header */}
      <View style={{ backgroundColor: '#111827' }}>
        <SafeAreaView edges={['top']}>
          <SearchBar />
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Hero — full width, no horizontal margin */}
        <HeroBanner />

        {/* White content area */}
        <View style={{ backgroundColor: '#F2F3F5', paddingTop: 12 }}>
          <CountdownTimer />
          <MatchesSection />
          <PlanningButton />
          <ResultDivider />
          <Standings />
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>


    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#111827' },

  // Search bar
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10, gap: 10,
  },
  searchInput: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 24,
    paddingHorizontal: 14, paddingVertical: 8, gap: 8,
  },
  searchPlaceholder: { color: '#9CA3AF', fontSize: 14, flex: 1 },
  avatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#544e49', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Hero
  hero: {
    backgroundColor: '#1a1f38',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 130,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.75,
  },
  heroHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    zIndex: 2, marginBottom: 14,
  },
  trophyBox: {
    width: 40, height: 43, borderRadius: 10,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: { color: '#fff', fontSize: 18, fontWeight: '700', flex: 1 },

  // Progress
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, zIndex: 2 },
  progressTrack: {
    flex: 2, height: 8, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4, overflow: 'hidden',
  },
  progressFill: {
    width: '15%', height: '100%',
    backgroundColor: '#fff', borderRadius: 4,
  },
  progressDot: { width: 8, height: 8, borderRadius: 4 },
  dotActive:  { backgroundColor: '#fff' },
  dotDim:     { backgroundColor: 'rgba(255,255,255,0.35)' },
  dateRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 4, zIndex: 2,
  },
  dateText: { color: 'rgba(255,255,255,0.75)', fontSize: 11 },

  // Countdown
countdownContainer: {
  marginHorizontal: 6,
  marginBottom: 8,
  backgroundColor: '#184A79',
  borderRadius: 12,
  paddingTop: 6,
  paddingBottom: 8,
},

partnerRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 7,
},

partnerText: {
  color: '#E6EEF8',
  fontSize: 9,
  fontWeight: '600',
},

partnerLogo: {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: '900',
  fontStyle: 'italic',
  marginLeft: 4,
},

timerRow: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  paddingHorizontal: 8,
},

timerBox: {
  flex: 1,
  height: 38,
  marginHorizontal: 3,
  backgroundColor: '#255B95',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
},

timerValue: {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: '800',
},

timerUnit: {
  fontSize: 10,
  fontWeight: '700',
  color: '#D6E6F8',
  textTransform: 'uppercase',
},

  // Match labels
  matchLabels: {
    flexDirection: 'row', paddingHorizontal: 16,
    marginBottom: 8, alignItems: 'flex-end',
  },
  matchLabelText: { fontSize: 18, fontWeight: '700', color: '#111827' },

  // Card
  card: {
    backgroundColor: '#fff', borderRadius: 24,
    padding: 14, width: 160, marginRight: 10,
    borderWidth: 0, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 0,
  },
  cardPartial: { width: 100 },
  cardPartialWrap: { width: 80 },
  cardGroup: { color: '#9CA3AF', fontSize: 11, textAlign: 'center', marginBottom: 10 },
  teamRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flag: { fontSize: 22 },
  teamCode: { fontSize: 15, fontWeight: '700', color: '#111827' },
  matchTime: { marginLeft: 'auto', fontSize: 14, fontWeight: '600', color: '#111827' },
  oddsRow: { flexDirection: 'row', gap: 4, marginBottom: 10 },
  oddPill: {
    flex: 1, backgroundColor: '#F1F5F9', borderRadius: 8,
    alignItems: 'center', paddingVertical: 5,
  },
  oddText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  venueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3 },
  venueText: { color: '#9CA3AF', fontSize: 11 },

  // Planning button
  planningWrap: { alignItems: 'center', marginVertical: 10 },
  planningBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#d3dbf7', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  planningText: { color: '#4361EE', fontSize: 12, fontWeight: '600' },

  // Result divider
  resultRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: '#F2F3F5',
  },
  resultLabel: { fontSize: 15, fontWeight: '700', color: '#111827' },
  betBadgeLg: {
    backgroundColor: '#1249A0', borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  betTextLg: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 2 },

  // Standings
  standingsHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, marginBottom: 10,
  },
  standingsTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  vueRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  vueText: { color: '#4361EE', fontSize: 14, fontWeight: '500' },
  groupTab: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 24, backgroundColor: '#E5E7EB',
  },
  groupTabActive: { backgroundColor: '#111827' },
  groupTabText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  groupTabTextActive: { color: '#fff' },

});