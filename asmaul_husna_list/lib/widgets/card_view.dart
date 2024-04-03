import 'package:asmaul_husna_list/model/api_response.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CardView extends StatelessWidget {
  final int index;
  final List<EntityModel> data;
  const CardView({super.key, required this.index, required this.data});

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.all(16),
        margin: const EdgeInsets.all(8),
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: const LinearGradient(
                colors: [Color(0xFF00FFB3), Color(0xFF8DFFD7)],
                begin: Alignment.bottomCenter,
                end: Alignment.topCenter),
            boxShadow: [
              BoxShadow(
                  color: Colors.grey.shade500,
                  offset: const Offset(0, 3),
                  blurRadius: 6.0)
            ]),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Align(
              alignment: Alignment.topRight,
              child: Text(
                data[index].urutan!.toString(),
                style: GoogleFonts.inter(
                    fontSize: 14, fontWeight: FontWeight.w700),
              ),
            ),
            Text(data[index].arab!,
                style: GoogleFonts.inter(
                    fontSize: 20, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center),
            Text(
              data[index].latin!,
              style:
                  GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Text(
                data[index].arti!,
                maxLines: 2,
                softWrap: true,
                overflow: TextOverflow.ellipsis,
                style: GoogleFonts.inter(
                    fontSize: 14, fontWeight: FontWeight.w600),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ));
  }
}
