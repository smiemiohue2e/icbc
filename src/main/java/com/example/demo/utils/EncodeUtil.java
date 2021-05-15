package com.example.demo.utils;

import sun.security.action.GetPropertyAction;

import java.io.CharArrayWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.nio.charset.IllegalCharsetNameException;
import java.nio.charset.UnsupportedCharsetException;
import java.security.AccessController;
import java.util.BitSet;

/**
 * @author: Black
 * @description: EncodeUtil
 * @date: 2018/12/25 11:17
 * @version: v 1.0.0
 */
public class EncodeUtil {

    static BitSet dontNeedEncoding;
    static final int CASE_DIFF = ('a' - 'A');
    static String dfltEncName = null;

    static {
        dontNeedEncoding = new BitSet(256);
        int i;
        for (i = 'a'; i <= 'z'; i++) {
            dontNeedEncoding.set(i);
        }
        for (i = 'A'; i <= 'Z'; i++) {
            dontNeedEncoding.set(i);
        }
        for (i = '0'; i <= '9'; i++) {
            dontNeedEncoding.set(i);
        }
        dontNeedEncoding.set(' ');
        dontNeedEncoding.set('-');
        dontNeedEncoding.set('_');
        dontNeedEncoding.set('.');
        dontNeedEncoding.set('*');

        dfltEncName = AccessController.doPrivileged(
                new GetPropertyAction("file.encoding")
        );
    }

    private EncodeUtil() {
    }

    public static String encode(String s) {
        return encode(s, "UTF-8");
    }

    public static String encode(String s, String enc) {

        boolean needToChange = false;
        StringBuffer out = new StringBuffer(s.length());
        Charset charset;
        CharArrayWriter charArrayWriter = new CharArrayWriter();

        if (enc == null) {
            throw new NullPointerException("charsetName");
        }

        try {
            charset = Charset.forName(enc);
        } catch (IllegalCharsetNameException | UnsupportedCharsetException e) {
            return s;
        }

        for (int i = 0; i < s.length(); ) {
            int c = (int) s.charAt(i);
            if (dontNeedEncoding.get(c)) {
                if (c == ' ') {
                    c = '+';
                    needToChange = true;
                }
                out.append((char) c);
                i++;
            } else {
                do {
                    charArrayWriter.write(c);
                    if (c >= 0xD800 && c <= 0xDBFF) {
                        if ((i + 1) < s.length()) {
                            int d = (int) s.charAt(i + 1);
                            if (d >= 0xDC00 && d <= 0xDFFF) {
                                charArrayWriter.write(d);
                                i++;
                            }
                        }
                    }
                    i++;
                } while (i < s.length() && !dontNeedEncoding.get((c = (int) s.charAt(i))));

                charArrayWriter.flush();
                String str = new String(charArrayWriter.toCharArray());
                byte[] ba = str.getBytes(charset);
                for (int j = 0; j < ba.length; j++) {
                    out.append('%');
                    char ch = Character.forDigit(((ba[j] >> 4) & 0xF), 16);
//                    if (Character.isLetter(ch)) {
//                        ch -= CASE_DIFF;
//                    }
                    out.append(ch);
                    ch = Character.forDigit((ba[j] & 0xF), 16);
//                    if (Character.isLetter(ch)) {
//                        ch -= CASE_DIFF;
//                    }
                    out.append(ch);
                }
                charArrayWriter.reset();
                needToChange = true;
            }
        }

        return (needToChange ? out.toString() : s);
    }

    public static void main(String[] args) throws UnsupportedEncodingException {
        System.out.println(encode("1231==312=3", "utf8"));
    }

}
